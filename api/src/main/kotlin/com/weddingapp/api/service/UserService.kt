package com.weddingapp.api.service

import com.weddingapp.api.dto.user.CreateUserRequest
import com.weddingapp.api.dto.user.UserResponse
import com.weddingapp.api.entity.User
import com.weddingapp.api.repository.UserRepository
import com.weddingapp.api.storage.r2.R2Storage
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Service
class UserService(
    private val userRepository: UserRepository,
    private val fileStorage: R2Storage
) {

    companion object {

        private val ALLOWED_PHOTO_TYPES = setOf(
            "image/jpeg",
            "image/png",
            "image/webp"
        )

        private const val MAX_PHOTO_SIZE =
            5L * 1024L * 1024L
    }

    fun getUserById(
        id: UUID
    ): UserResponse {

        val user = userRepository
            .findById(id)
            .orElseThrow {
                RuntimeException(
                    "Usuario no encontrado"
                )
            }

        return UserResponse.from(
            user,
            profilePhotoUrl(user)
        )
    }

    @Transactional
    fun updateUser(
        id: UUID,
        name: String
    ): UserResponse {

        val user = userRepository
            .findById(id)
            .orElseThrow {
                RuntimeException(
                    "Usuario no encontrado"
                )
            }

        user.name = name

        val savedUser =
            userRepository.save(user)

        return UserResponse.from(
            savedUser,
            profilePhotoUrl(savedUser)
        )
    }

    @Transactional
    fun updateProfilePhoto(
        id: UUID,
        photo: MultipartFile
    ): UserResponse {

        validatePhoto(photo)

        val user = userRepository
            .findById(id)
            .orElseThrow {
                RuntimeException(
                    "Usuario no encontrado"
                )
            }

        val previousPhotoPath =
            user.profilePhotoPath

        val storedFile =
            fileStorage.store(photo)

        try {

            user.profilePhotoPath =
                storedFile.key

            val savedUser =
                userRepository.save(user)

            /*
             * Solo eliminamos la foto anterior
             * después de guardar correctamente
             * la nueva referencia en la BD.
             */
            if (previousPhotoPath != null) {
                fileStorage.delete(
                    previousPhotoPath
                )
            }

            return UserResponse.from(
                savedUser,
                profilePhotoUrl(savedUser)
            )

        } catch (exception: Exception) {

            /*
             * Si falla PostgreSQL después de subir
             * la foto a R2, eliminamos el objeto
             * que acabamos de subir.
             */
            fileStorage.delete(
                storedFile.key
            )

            throw exception
        }
    }

    private fun profilePhotoUrl(
        user: User
    ): String? {

        return user.profilePhotoPath?.let {
            fileStorage.getUrl(it)
        }
    }

    fun createUser(
        request: CreateUserRequest
    ): UserLookupResult {

        val trimmedName =
            request.name.trim()

        val existingUser =
            userRepository.findByNameIgnoreCase(
                trimmedName
            )

        if (existingUser != null) {

            return UserLookupResult(
                user = UserResponse.from(
                    existingUser,
                    profilePhotoUrl(existingUser)
                ),
                created = false
            )
        }

        val newUser = User(
            name = trimmedName,
            points = 0
        )

        val savedUser =
            userRepository.save(newUser)

        return UserLookupResult(
            user = UserResponse.from(
                savedUser,
                profilePhotoUrl(savedUser)
            ),
            created = true
        )
    }

    /**
     * Genera una URL firmada temporal para
     * acceder directamente a la foto de perfil
     * almacenada en Cloudflare R2.
     */
    fun getProfilePhotoUrl(
        id: UUID
    ): String {

        val user = userRepository
            .findById(id)
            .orElseThrow {
                RuntimeException(
                    "Usuario no encontrado"
                )
            }

        val photoKey =
            user.profilePhotoPath
                ?: throw IllegalArgumentException(
                    "El usuario no tiene foto de perfil"
                )

        return fileStorage.getUrl(
            photoKey
        )
    }

    private fun validatePhoto(
        photo: MultipartFile
    ) {

        if (photo.isEmpty) {
            throw IllegalArgumentException(
                "La foto está vacía"
            )
        }

        if (photo.size > MAX_PHOTO_SIZE) {
            throw IllegalArgumentException(
                "La foto de perfil supera el límite de 5 MB"
            )
        }

        if (photo.contentType !in ALLOWED_PHOTO_TYPES) {
            throw IllegalArgumentException(
                "Tipo de archivo no permitido"
            )
        }
    }
}

data class UserLookupResult(
    val user: UserResponse,
    val created: Boolean
)
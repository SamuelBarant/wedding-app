package com.weddingapp.api.service

import com.weddingapp.api.dto.user.CreateUserRequest
import com.weddingapp.api.dto.user.UserResponse
import com.weddingapp.api.entity.User
import com.weddingapp.api.repository.UserRepository
import com.weddingapp.api.storage.LocalFileStorage
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.util.UUID

@Service
class UserService(
    private val userRepository: UserRepository,
    private val fileStorage: LocalFileStorage
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

    fun getUserById(id: UUID, baseUrl: String): UserResponse {
        val user = userRepository.findById(id)
            .orElseThrow {
                RuntimeException("Usuario no encontrado")
            }

        return UserResponse.from(user, baseUrl)
    }

    @Transactional
    fun updateUser(
        id: UUID,
        name: String,
        baseUrl: String
    ): UserResponse {

        val user = userRepository.findById(id)
            .orElseThrow {
                RuntimeException("Usuario no encontrado")
            }

        user.name = name

        val savedUser = userRepository.save(user)

        return UserResponse.from(savedUser, baseUrl)
    }

    @Transactional
    fun updateProfilePhoto(
        id: UUID,
        photo: MultipartFile,
        baseUrl: String
    ): UserResponse {

        validatePhoto(photo)

        val user = userRepository.findById(id)
            .orElseThrow {
                RuntimeException("Usuario no encontrado")
            }

        val previousPhotoPath = user.profilePhotoPath

        val storedFile = fileStorage.store(photo)
        user.profilePhotoPath = storedFile.filename

        val savedUser = userRepository.save(user)

        // Borramos la foto anterior solo si la nueva se ha guardado y persistido bien
        if (previousPhotoPath != null) {
            fileStorage.delete(previousPhotoPath)
        }

        return UserResponse.from(savedUser, baseUrl)
    }

    @Transactional
    fun createUser(
        request: CreateUserRequest
    ): UserResponse {

        val user = User(
            name = request.name,
            points = 0
        )

        val savedUser = userRepository.save(user)

        return UserResponse.from(savedUser, baseUrl = "")
    }

    /**
     * Devuelve la ruta y el content-type de la foto de perfil de un usuario,
     * para que el controller la pueda servir como archivo.
     */
    fun getProfilePhotoFile(id: UUID): StoredPhoto {

        val user = userRepository.findById(id)
            .orElseThrow {
                RuntimeException("Usuario no encontrado")
            }

        val photoPath = user.profilePhotoPath
            ?: throw IllegalArgumentException("El usuario no tiene foto de perfil")

        val path = fileStorage.load(photoPath)

        val contentType = Files.probeContentType(path)
            ?: "application/octet-stream"

        return StoredPhoto(
            path = path,
            contentType = contentType
        )
    }

    private fun validatePhoto(photo: MultipartFile) {

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
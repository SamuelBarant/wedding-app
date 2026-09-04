package com.weddingapp.api.service

import com.weddingapp.api.dto.photo.PhotoResponse
import com.weddingapp.api.entity.Photo
import com.weddingapp.api.repository.PhotoRepository
import com.weddingapp.api.repository.UserRepository
import com.weddingapp.api.storage.r2.R2Storage
import com.weddingapp.api.storage.r2.R2StoredResource
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Service
class PhotoService(
    private val photoRepository: PhotoRepository,
    private val userRepository: UserRepository,
    private val fileStorage: R2Storage
) {

    companion object {

        private val ALLOWED_TYPES = setOf(
            "image/jpeg",
            "image/png",
            "image/webp"
        )

        private const val MAX_FILE_SIZE =
            20L * 1024L * 1024L
    }

    @Transactional
    fun uploadPhoto(
        userId: UUID,
        caption: String?,
        file: MultipartFile
    ): PhotoResponse {

        validateFile(file)

        val user = userRepository
            .findById(userId)
            .orElseThrow {
                IllegalArgumentException(
                    "Usuario no encontrado"
                )
            }

        val storedFile = fileStorage.store(file)

        try {

            val photo = Photo(
                user = user,
                originalFilename =
                    file.originalFilename ?: "unknown",

                storedFilename =
                    storedFile.key,

                storagePath =
                    storedFile.key,

                contentType =
                    file.contentType
                        ?: "application/octet-stream",

                fileSize = file.size,

                caption = caption
            )

            val savedPhoto =
                photoRepository.save(photo)

            return PhotoResponse.from(
                savedPhoto,
                fileStorage.getUrl(
                    savedPhoto.storagePath
                )
            )

        } catch (exception: Exception) {

            fileStorage.delete(
                storedFile.key
            )

            throw exception
        }
    }

    fun getPhoto(
        id: UUID
    ): PhotoResponse {

        val photo = getPhotoEntity(id)

        return PhotoResponse.from(
            photo,
            fileStorage.getUrl(
                photo.storagePath
            )
        )
    }

    fun getUserPhotos(
        userId: UUID
    ): List<PhotoResponse> {

        if (!userRepository.existsById(userId)) {
            throw IllegalArgumentException(
                "Usuario no encontrado"
            )
        }

        return photoRepository
            .findAllByUserIdOrderByCreatedAtDesc(userId)
            .map { photo ->

                PhotoResponse.from(
                    photo,
                    fileStorage.getUrl(
                        photo.storagePath
                    )
                )
            }
    }

    fun getFileUrl(
        id: UUID
    ): String {

        val photo = getPhotoEntity(id)

        return fileStorage.getUrl(
            photo.storagePath
        )
    }

    fun getAllPhotos(
        pageable: Pageable,
        userName: String? = null
    ): Page<PhotoResponse> {

        val trimmedUserName =
            userName?.trim()?.takeIf { it.isNotEmpty() }

        val photos = if (trimmedUserName != null) {
            photoRepository
                .findAllByUser_NameContainingIgnoreCaseOrderByCreatedAtDesc(
                    trimmedUserName,
                    pageable
                )
        } else {
            photoRepository
                .findAllByOrderByCreatedAtDesc(pageable)
        }

        return photos.map { photo ->

            PhotoResponse.from(
                photo,
                fileStorage.getUrl(
                    photo.storagePath
                )
            )
        }
    }

    private fun getPhotoEntity(
        id: UUID
    ): Photo {

        return photoRepository
            .findById(id)
            .orElseThrow {
                IllegalArgumentException(
                    "Foto no encontrada"
                )
            }
    }

    private fun validateFile(
        file: MultipartFile
    ) {

        if (file.isEmpty) {
            throw IllegalArgumentException(
                "La foto está vacía"
            )
        }

        if (file.size > MAX_FILE_SIZE) {
            throw IllegalArgumentException(
                "La foto supera el límite de 20 MB"
            )
        }

        if (file.contentType !in ALLOWED_TYPES) {
            throw IllegalArgumentException(
                "Tipo de archivo no permitido"
            )
        }
    }
}

data class StoredPhoto(
    val resource: R2StoredResource,
    val contentType: String
)
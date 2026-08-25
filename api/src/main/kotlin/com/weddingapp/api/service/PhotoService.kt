package com.weddingapp.api.service

import com.weddingapp.api.dto.photo.PhotoResponse
import com.weddingapp.api.entity.Photo
import com.weddingapp.api.exception.PhotoNotAvailableException
import com.weddingapp.api.repository.PhotoRepository
import com.weddingapp.api.repository.UserRepository
import com.weddingapp.api.storage.LocalFileStorage
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Path
import java.time.LocalDateTime
import java.util.UUID

@Service
class PhotoService(

    private val photoRepository: PhotoRepository,

    private val userRepository: UserRepository,

    private val fileStorage: LocalFileStorage

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
        challengeId: UUID?,
        caption: String?,
        file: MultipartFile,
        baseUrl: String
    ): PhotoResponse {

        validateFile(file)

        val user = userRepository
            .findById(userId)
            .orElseThrow {
                IllegalArgumentException(
                    "Usuario no encontrado"
                )
            }

        val storedFile =
            fileStorage.store(file)

        try {

            val photo = Photo(
                user = user,
                originalFilename =
                    file.originalFilename
                        ?: "unknown",
                storedFilename =
                    storedFile.filename,
                storagePath =
                    storedFile.path,
                contentType =
                    file.contentType
                        ?: "application/octet-stream",
                fileSize = file.size,
                caption = caption,
            )

            return PhotoResponse.from(
                photoRepository.save(photo),
                baseUrl
            )

        } catch (exception: Exception) {

            fileStorage.delete(
                storedFile.filename
            )

            throw exception
        }
    }

    fun getPhoto(
        id: UUID,
        baseUrl: String
    ): PhotoResponse {

        val photo = getPhotoEntity(id)

        return PhotoResponse.from(
            photo,
            baseUrl
        )
    }

    fun getUserPhotos(
        userId: UUID,
        baseUrl: String
    ): List<PhotoResponse> {

        if (!userRepository.existsById(userId)) {
            throw IllegalArgumentException(
                "Usuario no encontrado"
            )
        }

        return photoRepository
            .findAllByUserIdOrderByCreatedAtDesc(userId)
            .map {
                PhotoResponse.from(
                    it,
                    baseUrl
                )
            }
    }

    fun getFile(
        id: UUID,
    ): StoredPhoto {

        val photo = getPhotoEntity(id)

        val path =
            fileStorage.load(
                photo.storedFilename
            )

        return StoredPhoto(
            path = path,
            contentType =
                photo.contentType
        )
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
    val path: Path,
    val contentType: String
)
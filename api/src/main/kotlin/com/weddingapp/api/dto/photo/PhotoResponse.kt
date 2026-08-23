package com.weddingapp.api.dto.photo

import com.weddingapp.api.entity.Photo
import com.weddingapp.api.entity.PhotoStatus
import java.time.LocalDateTime
import java.util.UUID

data class PhotoResponse(

    val id: UUID,

    val userId: UUID,

    val userName: String,

    val challengeId: UUID?,

    val challengeTitle: String?,

    val originalFilename: String,

    val contentType: String,

    val fileSize: Long,

    val caption: String?,

    val status: PhotoStatus,

    val createdAt: LocalDateTime,

    val url: String
) {

    companion object {

        fun from(
            photo: Photo,
            baseUrl: String
        ): PhotoResponse {

            return PhotoResponse(
                id = photo.id!!,
                userId = photo.user.id!!,
                userName = photo.user.name,
                challengeId = photo.challenge?.id,
                challengeTitle = photo.challenge?.title,
                originalFilename = photo.originalFilename,
                contentType = photo.contentType,
                fileSize = photo.fileSize,
                caption = photo.caption,
                status = photo.status,
                createdAt = photo.createdAt,
                url = "$baseUrl/api/photos/${photo.id}/file"
            )
        }
    }
}
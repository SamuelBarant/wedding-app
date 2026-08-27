package com.weddingapp.api.dto.photo

import com.weddingapp.api.entity.Photo
import java.time.LocalDateTime
import java.util.UUID

data class PhotoResponse(
    val id: UUID,
    val userId: UUID,
    val userName: String,
    val originalFilename: String,
    val contentType: String,
    val fileSize: Long,
    val caption: String?,
    val createdAt: LocalDateTime,
    val url: String
) {

    companion object {

        fun from(
            photo: Photo,
            url: String
        ): PhotoResponse {

            return PhotoResponse(
                id = photo.id!!,
                userId = photo.user.id!!,
                userName = photo.user.name,
                originalFilename = photo.originalFilename,
                contentType = photo.contentType,
                fileSize = photo.fileSize,
                caption = photo.caption,
                createdAt = photo.createdAt,
                url = url
            )
        }
    }
}
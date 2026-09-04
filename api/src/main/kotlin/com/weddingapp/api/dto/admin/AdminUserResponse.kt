package com.weddingapp.api.dto.admin

import com.weddingapp.api.entity.User
import com.weddingapp.api.entity.UserRole
import java.time.Instant
import java.util.UUID

data class AdminUserResponse(
    val id: UUID,
    val name: String,
    val role: UserRole,
    val points: Int,
    val photoCount: Long,
    val profilePhoto: String?,
    val createdAt: Instant
) {

    companion object {

        fun from(
            user: User,
            photoCount: Long,
            profilePhotoUrl: String?
        ): AdminUserResponse {

            return AdminUserResponse(
                id = user.id!!,
                name = user.name,
                role = user.role,
                points = user.points,
                photoCount = photoCount,
                profilePhoto = profilePhotoUrl,
                createdAt = user.createdAt
            )
        }
    }
}

package com.weddingapp.api.dto.user

import com.weddingapp.api.entity.User
import com.weddingapp.api.entity.UserRole
import java.util.UUID

data class UserResponse(
    val id: UUID,
    val name: String,
    val profilePhoto: String?,
    val role: UserRole,
    val points: Int
) {
    companion object {

        fun from(user: User): UserResponse {
            return UserResponse(
                id = user.id!!,
                name = user.name,
                profilePhoto = user.profilePhotoPath,
                role = user.role,
                points = user.points
            )
        }
    }
}
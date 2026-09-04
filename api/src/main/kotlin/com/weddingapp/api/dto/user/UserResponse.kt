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

        /**
         * @param profilePhotoUrl URL directa de R2 (ya resuelta vía
         *   R2Storage.getUrl), no la ruta interna de la API. Así el
         *   frontend puede usarla tal cual en un <img src>, igual que
         *   con PhotoResponse.url.
         */
        fun from(user: User, profilePhotoUrl: String?): UserResponse {

            return UserResponse(
                id = user.id!!,
                name = user.name,
                profilePhoto = profilePhotoUrl,
                role = user.role,
                points = user.points
            )
        }
    }
}
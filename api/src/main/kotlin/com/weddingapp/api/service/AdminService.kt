package com.weddingapp.api.service

import com.weddingapp.api.dto.admin.AdminDashboardResponse
import com.weddingapp.api.dto.admin.AdminUserResponse
import com.weddingapp.api.repository.PhotoRepository
import com.weddingapp.api.repository.UserRepository
import com.weddingapp.api.storage.r2.R2Storage
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class AdminService(
    private val userRepository: UserRepository,
    private val photoRepository: PhotoRepository,
    private val fileStorage: R2Storage
) {

    fun getDashboard(): AdminDashboardResponse {

        return AdminDashboardResponse(
            totalUsers = userRepository.count(),
            totalPhotos = photoRepository.count()
        )
    }

    fun getUsers(
        search: String?,
        pageable: Pageable
    ): Page<AdminUserResponse> {

        val trimmedSearch =
            search?.trim()?.takeIf { it.isNotEmpty() }

        val users = if (trimmedSearch != null) {
            userRepository
                .findAllByNameContainingIgnoreCaseOrderByCreatedAtDesc(
                    trimmedSearch,
                    pageable
                )
        } else {
            userRepository
                .findAllByOrderByCreatedAtDesc(pageable)
        }

        return users.map { user ->

            AdminUserResponse.from(
                user = user,
                photoCount = photoRepository.countByUserId(
                    user.id!!
                ),
                profilePhotoUrl = user.profilePhotoPath?.let {
                    fileStorage.getUrl(it)
                }
            )
        }
    }
}

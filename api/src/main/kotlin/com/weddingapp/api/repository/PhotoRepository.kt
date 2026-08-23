package com.weddingapp.api.repository

import com.weddingapp.api.entity.Photo
import com.weddingapp.api.entity.PhotoStatus
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface PhotoRepository: JpaRepository<Photo, UUID> {

    fun findAllByUserIdOrderByCreatedAtDesc(
        userId: UUID
    ): List<Photo>

    fun findAllByStatusOrderByCreatedAtAsc(
        status: PhotoStatus
    ): List<Photo>

    fun findAllByChallengeIdAndStatus(
        challengeId: UUID,
        status: PhotoStatus
    ): List<Photo>
}
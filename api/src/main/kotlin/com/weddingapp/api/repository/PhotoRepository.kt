package com.weddingapp.api.repository

import com.weddingapp.api.entity.Photo
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface PhotoRepository: JpaRepository<Photo, UUID> {

    fun findAllByUserIdOrderByCreatedAtDesc(
        userId: UUID
    ): List<Photo>

    fun findAllByOrderByCreatedAtDesc(
        pageable: Pageable
    ): Page<Photo>
}
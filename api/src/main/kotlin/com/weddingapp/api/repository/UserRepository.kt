package com.weddingapp.api.repository

import com.weddingapp.api.entity.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface UserRepository : JpaRepository<User, UUID> {

    fun findByFirebaseUid(firebaseUid: String): User?
    fun existsByFirebaseUid(firebaseUid: String): Boolean
    fun findByNameIgnoreCase(name: String): User?

    fun findAllByOrderByCreatedAtDesc(
        pageable: Pageable
    ): Page<User>

    fun findAllByNameContainingIgnoreCaseOrderByCreatedAtDesc(
        name: String,
        pageable: Pageable
    ): Page<User>
}
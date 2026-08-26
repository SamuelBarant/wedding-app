package com.weddingapp.api.repository

import com.weddingapp.api.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface UserRepository : JpaRepository<User, UUID> {

    fun findByFirebaseUid(firebaseUid: String): User?
    fun existsByFirebaseUid(firebaseUid: String): Boolean
    fun findByNameIgnoreCase(name: String): User?
}
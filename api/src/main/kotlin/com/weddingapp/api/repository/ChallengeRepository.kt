package com.weddingapp.api.repository

import com.weddingapp.api.entity.Challenge
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface ChallengeRepository : JpaRepository<Challenge, UUID> {

    fun findAllByActiveTrue(): List<Challenge>

    fun findAllByOrderByIdAsc(): List<Challenge>
}
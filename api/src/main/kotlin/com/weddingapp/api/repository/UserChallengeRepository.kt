package com.weddingapp.api.repository

import com.weddingapp.api.entity.UserChallenge
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface UserChallengeRepository : JpaRepository<UserChallenge, UUID> {

    fun findByUserIdOrderByChallengeId(
        userId: UUID
    ): List<UserChallenge>

    fun findByUserIdAndChallengeId(
        userId: UUID,
        challengeId: UUID
    ): UserChallenge?

    fun countByUserIdAndCompletedTrue(
        userId: UUID
    ): Long
}
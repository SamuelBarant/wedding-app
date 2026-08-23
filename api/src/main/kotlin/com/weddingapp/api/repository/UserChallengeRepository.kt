package com.weddingapp.api.repository

import com.weddingapp.api.entity.UserChallenge
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface UserChallengeRepository : JpaRepository<UserChallenge, UUID> {

    fun findByUserId(userId: UUID): List<UserChallenge>

    fun findByUserIdAndChallengeId(
        userId: UUID,
        challengeId: UUID
    ): UserChallenge?

    fun findByUserIdAndCompleted(
        userId: UUID,
        completed: Boolean
    ): List<UserChallenge>
}
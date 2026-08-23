package com.weddingapp.api.service

import com.weddingapp.api.dto.bingo.BingoChallengeResponse
import com.weddingapp.api.dto.bingo.BingoResponse
import com.weddingapp.api.repository.ChallengeRepository
import com.weddingapp.api.repository.UserChallengeRepository
import com.weddingapp.api.repository.UserRepository
import org.springframework.stereotype.Service
import java.util.UUID
import kotlin.text.get

@Service
class BingoService(

    private val userRepository: UserRepository,

    private val challengeRepository: ChallengeRepository,

    private val userChallengeRepository: UserChallengeRepository

) {

    fun getBingo(
        userId: UUID
    ): BingoResponse {

        val user = userRepository
            .findById(userId)
            .orElseThrow {
                IllegalArgumentException(
                    "Usuario no encontrado"
                )
            }

        val challenges = challengeRepository
            .findAllByOrderByIdAsc()

        val userChallenges =
            userChallengeRepository
                .findByUserIdOrderByChallengeId(user.id!!)

        val userChallengeMap =
            userChallenges.associateBy {
                it.challenge.id
            }

        val bingoChallenges = challenges.map { challenge ->

            val progress =
                userChallengeMap[challenge.id]

            BingoChallengeResponse(
                challengeId = challenge.id!!,
                title = challenge.title,
                description = challenge.description,
                points = challenge.points,
                completed = progress?.completed ?: false,
                completedAt = progress
                    ?.completedAt
                    ?.toString()
            )
        }

        val completed =
            bingoChallenges.count {
                it.completed
            }

        val totalPoints =
            userChallenges
                .filter { it.completed }
                .sumOf { it.pointsAwarded }

        val progress =
            if (challenges.isEmpty()) {
                0
            } else {
                ((completed.toDouble() /
                        challenges.size) * 100).toInt()
            }

        return BingoResponse(
            totalChallenges = challenges.size,
            completedChallenges = completed,
            totalPoints = totalPoints,
            progress = progress,
            challenges = bingoChallenges
        )
    }
}
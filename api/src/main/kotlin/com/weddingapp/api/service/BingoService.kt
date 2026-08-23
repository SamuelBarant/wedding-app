package com.weddingapp.api.service

import com.weddingapp.api.dto.bingo.BingoChallengeResponse
import com.weddingapp.api.dto.bingo.BingoResponse
import com.weddingapp.api.repository.UserChallengeRepository
import com.weddingapp.api.repository.UserRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class BingoService(

    private val userRepository: UserRepository,

    private val userChallengeRepository: UserChallengeRepository

) {

    fun getBingo(
        userId: UUID
    ): BingoResponse {

        // Comprobar que el usuario existe
        val user = userRepository
            .findById(userId)
            .orElseThrow {
                IllegalArgumentException(
                    "Usuario no encontrado"
                )
            }

        // Obtener SOLO los retos asignados a este usuario
        val userChallenges =
            userChallengeRepository
                .findByUserId(user.id!!)

        // Convertir UserChallenge -> BingoChallengeResponse
        val bingoChallenges =
            userChallenges.map { userChallenge ->

                val challenge =
                    userChallenge.challenge

                BingoChallengeResponse(
                    challengeId = challenge.id!!,
                    title = challenge.title,
                    description = challenge.description,
                    points = challenge.points,
                    completed = userChallenge.completed,
                    completedAt = userChallenge
                        .completedAt
                        ?.toString()
                )
            }

        // Retos completados
        val completed =
            userChallenges.count {
                it.completed
            }

        // Puntos obtenidos
        val totalPoints =
            userChallenges
                .filter { it.completed }
                .sumOf {
                    it.pointsAwarded
                }

        // Progreso sobre los retos asignados
        val progress =
            if (userChallenges.isEmpty()) {
                0
            } else {
                (
                        completed.toDouble() /
                                userChallenges.size *
                                100
                        ).toInt()
            }

        return BingoResponse(
            totalChallenges = userChallenges.size,
            completedChallenges = completed,
            totalPoints = totalPoints,
            progress = progress,
            challenges = bingoChallenges
        )
    }
}
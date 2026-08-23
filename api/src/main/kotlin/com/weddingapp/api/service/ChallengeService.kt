package com.weddingapp.api.service

import com.weddingapp.api.dto.challenge.ChallengeResponse
import com.weddingapp.api.dto.challenge.CreateChallengeRequest
import com.weddingapp.api.entity.Challenge
import com.weddingapp.api.repository.ChallengeRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID

@Service
class ChallengeService(
    private val challengeRepository: ChallengeRepository
) {

    /**
     * Obtiene todos los retos activos.
     *
     * Endpoint utilizado por los invitados.
     */
    fun getActiveChallenges(): List<ChallengeResponse> {

        return challengeRepository
            .findAllByActiveTrue()
            .map(ChallengeResponse::from)
    }

    /**
     * Obtiene todos los retos.
     *
     * Pensado principalmente para administración.
     */
    fun getAllChallenges(): List<ChallengeResponse> {

        return challengeRepository
            .findAll()
            .map(ChallengeResponse::from)
    }

    /**
     * Obtiene un reto concreto.
     */
    fun getChallenge(id: UUID): ChallengeResponse {

        val challenge = challengeRepository
            .findById(id)
            .orElseThrow {
                RuntimeException("Reto no encontrado")
            }

        return ChallengeResponse.from(challenge)
    }

    /**
     * Crea un nuevo reto.
     */
    fun createChallenge(
        request: CreateChallengeRequest
    ): ChallengeResponse {

        val challenge = Challenge(
            title = request.title,
            description = request.description,
            points = request.points,
            icon = request.icon,
            active = request.active
        )

        return ChallengeResponse.from(
            challengeRepository.save(challenge)
        )
    }

    /**
     * Actualiza un reto.
     */
    fun updateChallenge(
        id: UUID,
        request: CreateChallengeRequest
    ): ChallengeResponse {

        val challenge = challengeRepository
            .findById(id)
            .orElseThrow {
                RuntimeException("Reto no encontrado")
            }

        challenge.title = request.title
        challenge.description = request.description
        challenge.points = request.points
        challenge.icon = request.icon
        challenge.active = request.active
        challenge.updatedAt = LocalDateTime.now()

        return ChallengeResponse.from(
            challengeRepository.save(challenge)
        )
    }

    /**
     * Elimina un reto.
     */
    fun deleteChallenge(id: UUID) {

        if (!challengeRepository.existsById(id)) {
            throw RuntimeException("Reto no encontrado")
        }

        challengeRepository.deleteById(id)
    }
}
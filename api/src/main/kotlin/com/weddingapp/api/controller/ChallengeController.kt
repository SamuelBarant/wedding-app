package com.weddingapp.api.controller

import com.weddingapp.api.dto.challenge.ChallengeResponse
import com.weddingapp.api.service.ChallengeService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/challenges")
class ChallengeController(
    private val challengeService: ChallengeService
) {

    /**
     * Obtiene los retos que puede ver un invitado.
     *
     * GET /api/challenges
     */
    @GetMapping
    fun getActiveChallenges(): ResponseEntity<List<ChallengeResponse>> {

        return ResponseEntity.ok(
            challengeService.getActiveChallenges()
        )
    }

    /**
     * Obtiene un reto concreto.
     *
     * GET /api/challenges/{id}
     */
    @GetMapping("/{id}")
    fun getChallenge(
        @PathVariable id: UUID
    ): ResponseEntity<ChallengeResponse> {

        return ResponseEntity.ok(
            challengeService.getChallenge(id)
        )
    }
}
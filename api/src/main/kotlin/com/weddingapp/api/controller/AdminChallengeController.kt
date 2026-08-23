package com.weddingapp.api.controller

import com.weddingapp.api.dto.challenge.ChallengeResponse
import com.weddingapp.api.dto.challenge.CreateChallengeRequest
import com.weddingapp.api.service.ChallengeService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/admin/challenges")
class AdminChallengeController(
    private val challengeService: ChallengeService
) {

    /**
     * Obtiene todos los retos,
     * incluidos los desactivados.
     */
    @GetMapping
    fun getAllChallenges(): ResponseEntity<List<ChallengeResponse>> {

        return ResponseEntity.ok(
            challengeService.getAllChallenges()
        )
    }

    /**
     * Crea un reto.
     */
    @PostMapping
    fun createChallenge(
        @Valid @RequestBody request: CreateChallengeRequest
    ): ResponseEntity<ChallengeResponse> {

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(
                challengeService.createChallenge(request)
            )
    }

    /**
     * Actualiza un reto.
     */
    @PutMapping("/{id}")
    fun updateChallenge(
        @PathVariable id: UUID,
        @Valid @RequestBody request: CreateChallengeRequest
    ): ResponseEntity<ChallengeResponse> {

        return ResponseEntity.ok(
            challengeService.updateChallenge(
                id,
                request
            )
        )
    }

    /**
     * Elimina un reto.
     */
    @DeleteMapping("/{id}")
    fun deleteChallenge(
        @PathVariable id: UUID
    ): ResponseEntity<Void> {

        challengeService.deleteChallenge(id)

        return ResponseEntity.noContent().build()
    }
}
package com.weddingapp.api.controller

import com.weddingapp.api.dto.bingo.BingoResponse
import com.weddingapp.api.service.BingoService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/bingo")
class BingoController(

    private val bingoService: BingoService

) {

    @GetMapping("/{userId}")
    fun getBingo(
        @PathVariable userId: UUID
    ): ResponseEntity<BingoResponse> {

        return ResponseEntity.ok(
            bingoService.getBingo(userId)
        )
    }
}
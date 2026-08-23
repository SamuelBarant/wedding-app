package com.weddingapp.api.dto.bingo

import java.util.UUID

data class BingoChallengeResponse(

    val challengeId: UUID,

    val title: String,

    val description: String?,

    val points: Int,

    val completed: Boolean,

    val completedAt: String?
)
package com.weddingapp.api.dto.bingo

data class BingoResponse(

    val totalChallenges: Int,

    val completedChallenges: Int,

    val totalPoints: Int,

    val progress: Int,

    val challenges: List<BingoChallengeResponse>
)
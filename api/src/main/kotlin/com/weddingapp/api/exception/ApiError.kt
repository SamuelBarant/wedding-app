package com.weddingapp.api.exception

import java.time.LocalDateTime

data class ApiError(
    val status: Int,
    val error: String,
    val message: String,
    val timestamp: LocalDateTime = LocalDateTime.now()
)
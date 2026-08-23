package com.weddingapp.api.dto.challenge

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class CreateChallengeRequest(

    @field:NotBlank
    @field:Size(max = 150)
    val title: String,

    val description: String?,

    @field:Min(0)
    val points: Int = 1,

    @field:Size(max = 100)
    val icon: String? = null,

    val active: Boolean = true
)
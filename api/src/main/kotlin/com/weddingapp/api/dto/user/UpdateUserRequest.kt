package com.weddingapp.api.dto.user

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class UpdateUserRequest(

    @field:NotBlank
    @field:Size(max = 100)
    val name: String
)
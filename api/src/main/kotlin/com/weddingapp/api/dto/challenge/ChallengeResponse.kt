package com.weddingapp.api.dto.challenge

import com.weddingapp.api.entity.Challenge
import java.util.UUID

data class ChallengeResponse(

    val id: UUID,

    val title: String,

    val description: String?,

    val points: Int,

    val icon: String?,

    val active: Boolean

) {
    companion object {

        fun from(challenge: Challenge): ChallengeResponse {
            return ChallengeResponse(
                id = challenge.id!!,
                title = challenge.title,
                description = challenge.description,
                points = challenge.points,
                icon = challenge.icon,
                active = challenge.active
            )
        }
    }
}
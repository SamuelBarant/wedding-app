package com.weddingapp.api.entity

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(
    name = "user_challenges",
    uniqueConstraints = [
        UniqueConstraint(
            name = "uk_user_challenge",
            columnNames = ["user_id", "challenge_id"]
        )
    ]
)
class UserChallenge(

    @Id
    @GeneratedValue
    var id: UUID? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var user: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    var challenge: Challenge,

    @Column(nullable = false)
    var completed: Boolean = false,

    var completedAt: LocalDateTime? = null,

    @Column(nullable = false)
    var pointsAwarded: Int = 0,

    @Column(nullable = false)
    var createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now()
)
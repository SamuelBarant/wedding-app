package com.weddingapp.api.entity

import jakarta.persistence.*
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "users")
class User(

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    var id: UUID? = null,

    @Column(name = "firebase_uid", unique = true, length = 128)
    var firebaseUid: String? = null,

    @Column(nullable = false, length = 100)
    var name: String,

    @Column(name = "profile_photo_path", length = 500)
    var profilePhotoPath: String? = null,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    var role: UserRole = UserRole.GUEST,

    @Column(nullable = false)
    var points: Int = 0,

    @Column(name = "created_at", nullable = false)
    var createdAt: Instant = Instant.now(),

    @Column(name = "updated_at", nullable = false)
    var updatedAt: Instant = Instant.now()
)

enum class UserRole {
    GUEST,
    ADMIN
}
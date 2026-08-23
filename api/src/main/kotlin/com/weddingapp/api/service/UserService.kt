package com.weddingapp.api.service

import com.weddingapp.api.dto.user.CreateUserRequest
import com.weddingapp.api.dto.user.UpdateUserRequest
import com.weddingapp.api.dto.user.UserResponse
import com.weddingapp.api.entity.User
import com.weddingapp.api.entity.UserChallenge
import com.weddingapp.api.repository.ChallengeRepository
import com.weddingapp.api.repository.UserChallengeRepository
import com.weddingapp.api.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID

@Service
class UserService(
    private val userRepository: UserRepository,
    private val challengeRepository: ChallengeRepository,
    private val userChallengeRepository: UserChallengeRepository
) {

    fun getUserById(id: UUID): UserResponse {
        val user = userRepository.findById(id)
            .orElseThrow {
                RuntimeException("Usuario no encontrado")
            }

        return UserResponse.from(user)
    }

    fun updateUser(
        id: UUID,
        request: UpdateUserRequest
    ): UserResponse {

        val user = userRepository.findById(id)
            .orElseThrow {
                RuntimeException("Usuario no encontrado")
            }

        user.name = request.name

        val savedUser = userRepository.save(user)

        return UserResponse.from(savedUser)
    }

    @Transactional
    fun createUser(
        request: CreateUserRequest
    ): UserResponse {

        val user = User(
            name = request.name,
            points = 0
        )

        val savedUser = userRepository.save(user)

        assignRandomChallenges(savedUser)

        return UserResponse.from(savedUser)
    }

    private fun assignRandomChallenges(user: User) {

        // Obtenemos todos los retos disponibles del catálogo
        val challenges =
            challengeRepository.findAllByActiveTrue()

        println("RETOS ACTIVOS: ${challenges.size}")

        if (challenges.size < 25) {
            throw IllegalStateException(
                "No hay suficientes retos activos para crear el Bingo. " +
                        "Se necesitan al menos 25 y hay ${challenges.size}."
            )
        }

        // Seleccionamos 25 retos aleatorios
        val selectedChallenges =
            challenges
                .shuffled()
                .take(25)

        println("RETOS SELECCIONADOS: ${selectedChallenges.size}")

        selectedChallenges.forEach {
            println(" - ${it.id} | ${it.title}")
        }

        val now = LocalDateTime.now()

        // Creamos la relación User <-> Challenge
        val userChallenges =
            selectedChallenges.map { challenge ->

                UserChallenge(
                    user = user,
                    challenge = challenge,
                    completed = false,
                    completedAt = null,
                    pointsAwarded = 0,
                    createdAt = now,
                    updatedAt = now
                )
            }

        println("USER CHALLENGES A GUARDAR: ${userChallenges.size}")

        userChallengeRepository.saveAll(userChallenges)
    }
}
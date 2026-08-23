package com.weddingapp.api.service

import com.weddingapp.api.dto.user.UpdateUserRequest
import com.weddingapp.api.dto.user.UserResponse
import com.weddingapp.api.entity.User
import com.weddingapp.api.repository.UserRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class UserService(
    private val userRepository: UserRepository
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

    fun createUser(
        name: String,
        firebaseUid: String? = null
    ): UserResponse {

        val user = User(
            name = name,
            firebaseUid = firebaseUid
        )

        return UserResponse.from(
            userRepository.save(user)
        )
    }
}
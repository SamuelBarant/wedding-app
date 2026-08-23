package com.weddingapp.api.controller

import com.weddingapp.api.dto.user.UpdateUserRequest
import com.weddingapp.api.dto.user.UserResponse
import com.weddingapp.api.service.UserService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
) {

    /**
     * V1 temporal:
     * utilizamos el UUID del usuario directamente.
     *
     * Más adelante este endpoint utilizará Firebase Authentication.
     */
    @GetMapping("/{id}")
    fun getUser(
        @PathVariable id: UUID
    ): ResponseEntity<UserResponse> {

        return ResponseEntity.ok(
            userService.getUserById(id)
        )
    }

    @PutMapping("/{id}")
    fun updateUser(
        @PathVariable id: UUID,
        @Valid @RequestBody request: UpdateUserRequest
    ): ResponseEntity<UserResponse> {

        return ResponseEntity.ok(
            userService.updateUser(id, request)
        )
    }
}
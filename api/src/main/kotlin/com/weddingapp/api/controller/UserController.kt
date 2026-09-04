package com.weddingapp.api.controller

import com.weddingapp.api.dto.user.CreateUserRequest
import com.weddingapp.api.dto.user.UpdateUserRequest
import com.weddingapp.api.dto.user.UserResponse
import com.weddingapp.api.service.UserService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
) {

    @GetMapping("/{id}")
    fun getUser(
        @PathVariable id: UUID
    ): ResponseEntity<UserResponse> {

        return ResponseEntity.ok(
            userService.getUserById(
                id = id
            )
        )
    }

    @PutMapping("/{id}")
    fun updateUser(
        @PathVariable id: UUID,
        @Valid @RequestBody request: UpdateUserRequest
    ): ResponseEntity<UserResponse> {

        return ResponseEntity.ok(
            userService.updateUser(
                id = id,
                name = request.name
            )
        )
    }

    @PostMapping
    fun createUser(
        @RequestBody request: CreateUserRequest
    ): ResponseEntity<UserResponse> {

        val result = userService.createUser(request)

        val status = if (result.created) {
            HttpStatus.CREATED
        } else {
            HttpStatus.OK
        }

        return ResponseEntity
            .status(status)
            .body(result.user)
    }

    /**
     * Subida/cambio de foto de perfil.
     *
     * La foto se recibe en el backend y posteriormente
     * se almacena en Cloudflare R2.
     */
    @PostMapping(
        "/{id}/photo",
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    fun uploadProfilePhoto(
        @PathVariable id: UUID,
        @RequestParam photo: MultipartFile
    ): ResponseEntity<UserResponse> {

        return ResponseEntity.ok(
            userService.updateProfilePhoto(
                id = id,
                photo = photo
            )
        )
    }

    /**
     * Devuelve una URL firmada temporal de R2
     * para acceder directamente a la foto.
     */
    @GetMapping("/{id}/photo")
    fun getProfilePhoto(
        @PathVariable id: UUID
    ): ResponseEntity<String> {

        val url = userService.getProfilePhotoUrl(id)

        return ResponseEntity
            .ok()
            .body(url)
    }
}
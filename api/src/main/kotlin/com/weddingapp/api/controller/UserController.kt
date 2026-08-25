package com.weddingapp.api.controller

import com.weddingapp.api.dto.user.CreateUserRequest
import com.weddingapp.api.dto.user.UpdateUserRequest
import com.weddingapp.api.dto.user.UserResponse
import com.weddingapp.api.service.UserService
import jakarta.servlet.http.HttpServletRequest
import jakarta.validation.Valid
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.http.HttpHeaders
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
        @PathVariable id: UUID,
        request: HttpServletRequest
    ): ResponseEntity<UserResponse> {

        return ResponseEntity.ok(
            userService.getUserById(id, getBaseUrl(request))
        )
    }

    @PutMapping("/{id}")
    fun updateUser(
        @PathVariable id: UUID,
        @Valid @RequestBody request: UpdateUserRequest,
        httpRequest: HttpServletRequest
    ): ResponseEntity<UserResponse> {

        return ResponseEntity.ok(
            userService.updateUser(
                id = id,
                name = request.name,
                baseUrl = getBaseUrl(httpRequest)
            )
        )
    }

    @PostMapping
    fun createUser(
        @RequestBody request: CreateUserRequest
    ): ResponseEntity<UserResponse> {

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(userService.createUser(request))
    }

    /**
     * Subida/cambio de foto de perfil. Va en POST (no PUT) porque
     * el Servlet spec solo permite parsear multipart/form-data
     * en peticiones POST.
     */
    @PostMapping(
        "/{id}/photo",
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    fun uploadProfilePhoto(
        @PathVariable id: UUID,
        @RequestParam photo: MultipartFile,
        request: HttpServletRequest
    ): ResponseEntity<UserResponse> {

        return ResponseEntity.ok(
            userService.updateProfilePhoto(
                id = id,
                photo = photo,
                baseUrl = getBaseUrl(request)
            )
        )
    }

    @GetMapping("/{id}/photo")
    fun getProfilePhoto(
        @PathVariable id: UUID
    ): ResponseEntity<Resource> {

        val storedPhoto = userService.getProfilePhotoFile(id)

        val resource = UrlResource(
            storedPhoto.path.toUri()
        )

        return ResponseEntity
            .ok()
            .contentType(
                MediaType.parseMediaType(
                    storedPhoto.contentType
                )
            )
            .header(
                HttpHeaders.CONTENT_DISPOSITION,
                "inline"
            )
            .body(resource)
    }

    private fun getBaseUrl(
        request: HttpServletRequest
    ): String {
        return "${request.scheme}://${request.serverName}:${request.serverPort}"
    }
}
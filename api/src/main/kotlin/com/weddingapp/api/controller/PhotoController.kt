package com.weddingapp.api.controller

import com.weddingapp.api.dto.photo.PhotoResponse
import com.weddingapp.api.service.PhotoService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@RestController
@RequestMapping("/api/photos")
class PhotoController(

    private val photoService: PhotoService

) {

    @PostMapping(
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    fun uploadPhoto(

        @RequestParam userId: UUID,

        @RequestParam(required = false)
        challengeId: UUID?,

        @RequestParam(required = false)
        caption: String?,

        @RequestParam("file")
        file: MultipartFile,

        request: HttpServletRequest

    ): ResponseEntity<PhotoResponse> {

        val baseUrl = getBaseUrl(request)

        val response = photoService.uploadPhoto(
            userId = userId,
            challengeId = challengeId,
            caption = caption,
            file = file,
            baseUrl = baseUrl
        )

        return ResponseEntity
            .status(201)
            .body(response)
    }

    @GetMapping("/{id}")
    fun getPhoto(
        @PathVariable id: UUID,
        request: HttpServletRequest
    ): ResponseEntity<PhotoResponse> {

        return ResponseEntity.ok(
            photoService.getPhoto(
                id,
                getBaseUrl(request)
            )
        )
    }

    @GetMapping("/user/{userId}")
    fun getUserPhotos(
        @PathVariable userId: UUID,
        request: HttpServletRequest
    ): ResponseEntity<List<PhotoResponse>> {

        return ResponseEntity.ok(
            photoService.getUserPhotos(
                userId,
                getBaseUrl(request)
            )
        )
    }

    @GetMapping("/{id}/file")
    fun getFile(
        @PathVariable id: UUID
    ): ResponseEntity<Resource> {

        val storedPhoto = photoService.getFile(
            id = id,
            isAdmin = false
        )

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
package com.weddingapp.api.controller

import com.weddingapp.api.dto.photo.PhotoResponse
import com.weddingapp.api.service.PhotoService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.web.bind.annotation.*
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import java.util.UUID

@RestController
@RequestMapping("/api/admin/photos")
class AdminPhotoController(

    private val photoService: PhotoService

) {

    @GetMapping("/pending")
    fun getPendingPhotos(
        request: HttpServletRequest
    ): ResponseEntity<List<PhotoResponse>> {

        val baseUrl =
            "${request.scheme}://${request.serverName}:${request.serverPort}"

        return ResponseEntity.ok(
            photoService.getPendingPhotos(baseUrl)
        )
    }

    @PostMapping("/{id}/approve")
    fun approvePhoto(
        @PathVariable id: UUID,
        request: HttpServletRequest
    ): ResponseEntity<PhotoResponse> {

        val baseUrl =
            "${request.scheme}://${request.serverName}:${request.serverPort}"

        return ResponseEntity.ok(
            photoService.approvePhoto(
                id,
                baseUrl
            )
        )
    }

    @PostMapping("/{id}/reject")
    fun rejectPhoto(
        @PathVariable id: UUID,
        request: HttpServletRequest
    ): ResponseEntity<PhotoResponse> {

        val baseUrl =
            "${request.scheme}://${request.serverName}:${request.serverPort}"

        return ResponseEntity.ok(
            photoService.rejectPhoto(
                id,
                baseUrl
            )
        )
    }

    @GetMapping("/{id}/file")
    fun getFile(
        @PathVariable id: UUID
    ): ResponseEntity<Resource> {

        val storedPhoto = photoService.getFile(
            id = id,
            isAdmin = true
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
}
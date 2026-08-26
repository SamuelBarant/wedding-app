package com.weddingapp.api.controller

import com.weddingapp.api.dto.photo.PhotoResponse
import com.weddingapp.api.service.PhotoService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.http.CacheControl
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.time.Duration
import java.util.UUID

@RestController
@RequestMapping("/api/photos")
class PhotoController(
    private val photoService: PhotoService
) {

    @PostMapping(
        consumes = ["multipart/form-data"]
    )
    fun uploadPhoto(
        @RequestParam userId: UUID,
        @RequestParam(required = false) caption: String?,
        @RequestParam("file") file: MultipartFile,
        request: HttpServletRequest
    ): ResponseEntity<PhotoResponse> {

        val baseUrl = getBaseUrl(request)

        val response = photoService.uploadPhoto(
            userId = userId,
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
                id = id,
                baseUrl = getBaseUrl(request)
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
                userId = userId,
                baseUrl = getBaseUrl(request)
            )
        )
    }

    @GetMapping("/{id}/file")
    fun getFile(
        @PathVariable id: UUID
    ): ResponseEntity<String> {

        val url = photoService.getFileUrl(id)

        return ResponseEntity
            .ok()
            .cacheControl(
                CacheControl
                    .maxAge(Duration.ofMinutes(10))
                    .cachePublic()
            )
            .body(url)
    }

    @GetMapping
    fun getPhotos(
        @PageableDefault(
            size = 20,
            sort = ["createdAt"],
            direction = Sort.Direction.DESC
        )
        pageable: Pageable,
        request: HttpServletRequest
    ): ResponseEntity<Page<PhotoResponse>> {

        val baseUrl = getBaseUrl(request)

        val photos =
            photoService.getAllPhotos(
                pageable = pageable,
                baseUrl = baseUrl
            )

        return ResponseEntity
            .ok()
            .cacheControl(
                CacheControl.maxAge(
                    Duration.ofSeconds(15)
                )
            )
            .body(photos)
    }

    private fun getBaseUrl(
        request: HttpServletRequest
    ): String {
        return "${request.scheme}://${request.serverName}:${request.serverPort}"
    }
}
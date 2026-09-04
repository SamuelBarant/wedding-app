package com.weddingapp.api.controller

import com.weddingapp.api.dto.photo.PhotoResponse
import com.weddingapp.api.service.PhotoService
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
        @RequestParam("file") file: MultipartFile
    ): ResponseEntity<PhotoResponse> {

        val response =
            photoService.uploadPhoto(
                userId = userId,
                caption = caption,
                file = file
            )

        return ResponseEntity
            .status(201)
            .body(response)
    }

    @GetMapping("/{id}")
    fun getPhoto(
        @PathVariable id: UUID
    ): ResponseEntity<PhotoResponse> {

        return ResponseEntity.ok(
            photoService.getPhoto(id)
        )
    }

    @GetMapping("/user/{userId}")
    fun getUserPhotos(
        @PathVariable userId: UUID
    ): ResponseEntity<List<PhotoResponse>> {

        return ResponseEntity.ok(
            photoService.getUserPhotos(userId)
        )
    }

    @GetMapping("/{id}/file")
    fun getFile(
        @PathVariable id: UUID
    ): ResponseEntity<String> {

        val url =
            photoService.getFileUrl(id)

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
        @RequestParam(required = false) userName: String?,
        @PageableDefault(
            size = 20,
            sort = ["createdAt"],
            direction = Sort.Direction.DESC
        )
        pageable: Pageable
    ): ResponseEntity<Page<PhotoResponse>> {

        val photos =
            photoService.getAllPhotos(
                pageable = pageable,
                userName = userName
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
}
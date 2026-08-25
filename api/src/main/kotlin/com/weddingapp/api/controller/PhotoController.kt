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
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.http.CacheControl
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.time.Duration

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
        caption: String?,

        @RequestParam("file")
        file: MultipartFile,

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
            id = id
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

    @GetMapping
    fun getPhotos(
        @PageableDefault(
            size = 20,
            sort = ["createdAt"],
            direction = Sort.Direction.DESC
        ) pageable: Pageable,
        request: HttpServletRequest
    ): ResponseEntity<Page<PhotoResponse>> {

        val baseUrl = ServletUriComponentsBuilder
            .fromRequestUri(request)
            .replacePath(null)
            .build()
            .toUriString()

        val photos = photoService.getAllPhotos(pageable, baseUrl)

        return ResponseEntity.ok()
            .cacheControl(CacheControl.maxAge(Duration.ofSeconds(15)))
            .body(photos)
    }


    private fun getBaseUrl(
        request: HttpServletRequest
    ): String {
        return "${request.scheme}://${request.serverName}:${request.serverPort}"
    }
}
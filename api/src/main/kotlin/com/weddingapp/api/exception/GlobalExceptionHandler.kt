package com.weddingapp.api.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleIllegalArgumentException(
        exception: IllegalArgumentException
    ): ResponseEntity<ApiError> {

        val error = ApiError(
            status = HttpStatus.BAD_REQUEST.value(),
            error = HttpStatus.BAD_REQUEST.reasonPhrase,
            message = exception.message ?: "Solicitud inválida"
        )

        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(error)
    }

    @ExceptionHandler(PhotoNotAvailableException::class)
    fun handlePhotoNotAvailable(
        exception: PhotoNotAvailableException
    ): ResponseEntity<ApiError> {

        val error = ApiError(
            status = HttpStatus.FORBIDDEN.value(),
            error = HttpStatus.FORBIDDEN.reasonPhrase,
            message = exception.message ?: "La foto todavía no está disponible"
        )

        return ResponseEntity
            .status(HttpStatus.FORBIDDEN)
            .body(error)
    }
}
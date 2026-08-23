package com.weddingapp.api.exception

class PhotoNotAvailableException(
    message: String = "La foto todavía no está disponible"
) : RuntimeException(message)
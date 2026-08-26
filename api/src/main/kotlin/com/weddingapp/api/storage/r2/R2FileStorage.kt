package com.weddingapp.api.storage.r2

import org.springframework.web.multipart.MultipartFile
import java.io.InputStream

interface R2Storage {

    fun store(file: MultipartFile): R2StoredFile

    fun getUrl(key: String): String

    fun delete(key: String)
}

data class R2StoredFile(
    val key: String
)

data class R2StoredResource(
    val inputStream: InputStream,
    val contentLength: Long,
    val contentType: String?
)
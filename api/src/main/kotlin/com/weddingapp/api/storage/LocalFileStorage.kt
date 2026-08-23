package com.weddingapp.api.storage

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption
import java.util.UUID

@Service
class LocalFileStorage(

    @Value("\${storage.photos-path}")
    private val photosPath: String

) {

    private val rootPath: Path
        get() = Path.of(photosPath).toAbsolutePath().normalize()

    fun store(file: MultipartFile): StoredFile {

        if (file.isEmpty) {
            throw IllegalArgumentException("El archivo está vacío")
        }

        val extension = getExtension(file.originalFilename)

        val storedFilename = if (extension != null) {
            "${UUID.randomUUID()}.$extension"
        } else {
            UUID.randomUUID().toString()
        }

        Files.createDirectories(rootPath)

        val destination = rootPath
            .resolve(storedFilename)
            .normalize()

        if (!destination.startsWith(rootPath)) {
            throw IllegalArgumentException("Ruta de archivo inválida")
        }

        Files.copy(
            file.inputStream,
            destination,
            StandardCopyOption.REPLACE_EXISTING
        )

        return StoredFile(
            filename = storedFilename,
            path = destination.toString()
        )
    }

    fun load(filename: String): Path {

        val path = rootPath
            .resolve(filename)
            .normalize()

        if (!path.startsWith(rootPath)) {
            throw IllegalArgumentException("Ruta de archivo inválida")
        }

        if (!Files.exists(path)) {
            throw IllegalArgumentException("Archivo no encontrado")
        }

        return path
    }

    fun delete(filename: String) {

        val path = rootPath
            .resolve(filename)
            .normalize()

        if (!path.startsWith(rootPath)) {
            throw IllegalArgumentException("Ruta de archivo inválida")
        }

        Files.deleteIfExists(path)
    }

    private fun getExtension(filename: String?): String? {

        if (filename.isNullOrBlank()) {
            return null
        }

        val index = filename.lastIndexOf('.')

        if (index == -1 || index == filename.lastIndex) {
            return null
        }

        return filename
            .substring(index + 1)
            .lowercase()
    }
}

data class StoredFile(
    val filename: String,
    val path: String
)
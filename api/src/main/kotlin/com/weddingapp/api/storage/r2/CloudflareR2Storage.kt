package com.weddingapp.api.storage.r2

import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import software.amazon.awssdk.core.sync.RequestBody
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest
import software.amazon.awssdk.services.s3.model.GetObjectRequest
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import software.amazon.awssdk.services.s3.presigner.S3Presigner
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest
import java.time.Duration
import java.util.UUID

@Service
class CloudflareR2Storage(
    private val s3Client: S3Client,
    private val s3Presigner: S3Presigner,
    private val r2Properties: R2Properties
) : R2Storage {

    override fun store(
        file: MultipartFile
    ): R2StoredFile {

        val extension =
            file.originalFilename
                ?.substringAfterLast('.', "")
                ?.lowercase()
                ?.takeIf { it.isNotBlank() }

        val key =
            if (extension != null) {
                "photos/${UUID.randomUUID()}.$extension"
            } else {
                "photos/${UUID.randomUUID()}"
            }

        val request =
            PutObjectRequest.builder()
                .bucket(r2Properties.bucket)
                .key(key)
                .contentType(
                    file.contentType
                        ?: "application/octet-stream"
                )
                .contentLength(file.size)
                .build()

        s3Client.putObject(
            request,
            RequestBody.fromInputStream(
                file.inputStream,
                file.size
            )
        )

        return R2StoredFile(
            key = key
        )
    }

    override fun getUrl(
        key: String
    ): String {

        val request =
            GetObjectRequest.builder()
                .bucket(r2Properties.bucket)
                .key(key)
                .build()

        val presignRequest =
            GetObjectPresignRequest.builder()
                .signatureDuration(
                    Duration.ofMinutes(10)
                )
                .getObjectRequest(request)
                .build()

        return s3Presigner
            .presignGetObject(presignRequest)
            .url()
            .toString()
    }

    override fun delete(
        key: String
    ) {

        val request =
            DeleteObjectRequest.builder()
                .bucket(r2Properties.bucket)
                .key(key)
                .build()

        s3Client.deleteObject(request)
    }
}
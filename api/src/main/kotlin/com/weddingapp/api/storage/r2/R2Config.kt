package com.weddingapp.api.storage.r2

import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client
import java.net.URI

@Configuration
@EnableConfigurationProperties(R2Properties::class)
class R2Config {

    @Bean
    fun s3Client(
        properties: R2Properties
    ): S3Client {

        val credentials =
            AwsBasicCredentials.create(
                properties.accessKey,
                properties.secretKey
            )

        return S3Client.builder()
            .endpointOverride(
                URI.create(properties.endpoint)
            )
            .region(Region.of("auto"))
            .credentialsProvider(
                StaticCredentialsProvider.create(
                    credentials
                )
            )
            .build()
    }
}
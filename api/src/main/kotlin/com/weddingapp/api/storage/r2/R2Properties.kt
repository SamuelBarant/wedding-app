package com.weddingapp.api.storage.r2

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "r2")
data class R2Properties(
    val endpoint: String,
    val accessKey: String,
    val secretKey: String,
    val bucket: String
)
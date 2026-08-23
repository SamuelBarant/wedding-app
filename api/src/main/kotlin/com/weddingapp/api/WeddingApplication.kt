package com.weddingapp.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class WeddingApplication

fun main(args: Array<String>) {
    runApplication<WeddingApplication>(*args)
}

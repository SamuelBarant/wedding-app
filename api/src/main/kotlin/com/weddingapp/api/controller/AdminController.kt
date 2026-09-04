package com.weddingapp.api.controller

import com.weddingapp.api.dto.admin.AdminDashboardResponse
import com.weddingapp.api.dto.admin.AdminUserResponse
import com.weddingapp.api.service.AdminService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * Rutas de administración. V1: sin autorización real en el backend
 * (el acceso se controla hoy solo con un gate de contraseña en el
 * frontend) - ver nota en AdminGate.jsx.
 */
@RestController
@RequestMapping("/api/admin")
class AdminController(
    private val adminService: AdminService
) {

    @GetMapping("/dashboard")
    fun getDashboard(): ResponseEntity<AdminDashboardResponse> {

        return ResponseEntity.ok(
            adminService.getDashboard()
        )
    }

    @GetMapping("/users")
    fun getUsers(
        @RequestParam(required = false) search: String?,
        @PageableDefault(
            size = 20,
            sort = ["createdAt"],
            direction = Sort.Direction.DESC
        )
        pageable: Pageable
    ): ResponseEntity<Page<AdminUserResponse>> {

        return ResponseEntity.ok(
            adminService.getUsers(
                search = search,
                pageable = pageable
            )
        )
    }
}

# 💍 Wedding Bingo

Aplicación web interactiva para una boda que permite a los invitados participar en un bingo de retos fotográficos y compartir los mejores momentos del evento.

## ✨ Funcionalidades

- 👤 Identificación y perfil de invitados
- 📸 Subida de fotografías desde cámara o galería
- 🏆 Bingo de retos fotográficos
- 🎯 Sistema de puntos y progreso
- ⏳ Revisión y aprobación de fotografías
- 🖼️ Galería de fotografías de la boda
- 📱 Diseño responsive para móviles
- 🔐 Identificación de cada fotografía mediante el usuario que la subió
- 👨‍💼 Panel de administración para gestionar fotografías, usuarios y retos

## 🛠️ Tecnologías

- React
- Vite
- Material UI (MUI)
- Spring Boot
- Docker
- PostgreSQL
- Firebase
- Cloudflare

## 🏗️ Arquitectura

La aplicación está diseñada para minimizar la carga sobre el servidor doméstico y permitir que numerosos invitados utilicen la plataforma simultáneamente.

El frontend se sirve mediante Cloudflare, mientras que la autenticación y gestión de usuarios se delegan en Firebase. El almacenamiento de fotografías y los servicios propios pueden mantenerse self-hosted en un servidor doméstico.

```text
                    ┌──────────────┐
                    │    Invitado  │
                    │    📱 Web    │
                    └──────┬───────┘
                           │
                           ▼
                    ☁️ Cloudflare
                           │
                    ┌──────┴───────┐
                    │              │
                 React         API/Workers
                    │              │
                    │         Firebase
                    │              │
                    └──────┬───────┘
                           │
                           ▼
                    🏠 Self-hosted
                       Server
                           │
                    ┌──────┴──────┐
                    │             │
                 Fotos        PostgreSQL
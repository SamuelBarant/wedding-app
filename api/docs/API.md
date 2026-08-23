# 💍 Wedding Bingo API

API REST del proyecto **Wedding Bingo**.

La API se encarga de gestionar:

- 👤 Usuarios  
- 📸 Fotografías  
- 🎯 Retos del bingo  
- 🏆 Progreso de los jugadores  
- 👨‍💼 Administración  
- 🖼️ Fotos de perfil

---

# 🏗️ Arquitectura

```text  
┌──────────────┐  
│    React     │  
│     + MUI    │  
└──────┬───────┘  
│  
│ HTTP / REST  
▼  
┌──────────────┐  
│ Spring Boot  │  
│     API      │  
└──────┬───────┘  
│  
┌──────────┴──────────┐  
│                     │  
▼                     ▼  
┌──────────────┐      ┌──────────────┐  
│  PostgreSQL  │      │ File Storage  │  
│              │      │              │  
│   Usuarios   │      │    Fotos     │  
│   Retos      │      │    Perfiles  │  
│   Progreso   │      │              │  
└──────────────┘      └──────────────┘

Las fotografías se almacenan físicamente en:
/data/wedding/
```

La base de datos únicamente almacena los metadatos y la ruta del archivo.

# 🌐 Base URL

## Desarrollo

```
http://localhost:8080/api
```

## Producción

```
https://api.example.com/api
```



# 🔐 Autenticación

Actualmente la V1 puede utilizar una identificación sencilla de usuario.

En futuras versiones se utilizará:

```
Firebase Authentication
```

El usuario será identificado mediante su:

```
firebase_uid
```

Arquitectura futura:

React  
│  
│ Firebase Authentication  
▼  
Firebase  
│  
│ UID  
▼  
Spring Boot  
│  
▼  
PostgreSQL

El backend nunca confiará únicamente en el nombre proporcionado por el cliente.



# 📦 Formato de respuestas

Las respuestas utilizarán códigos HTTP estándar.

| Código | Significado                       |
|--------|-----------------------------------|
| 200    | OK                                |
| 201    | Recurso creado                    |
| 204    | Operación realizada sin contenido |
| 400    | Petición incorrecta               |
| 401    | No autenticado                    |
| 403    | Sin permisos                      |
| 404    | Recurso no encontrado             |
| 409    | Conflicto                         |
| 413    | Archivo demasiado grande          |
| 415    | Tipo de archivo no permitido      |
| 500    | Error interno                     |



# ❌ Errores

Todos los errores deberán utilizar un formato común:

```text
{  
    "timestamp": "2026-08-23T14:30:00",  
    "status": 400,  
    "error": "BAD\_REQUEST",  
    "message": "La imagen no es válida",  
    "path": "/api/photos"  
}
```


# 👤 Users

## Obtener usuario actual

```
GET /api/users/me
```

Obtiene la información del usuario actualmente autenticado.

### Response

```text
{  
    "id": "8f8c1b91-3d8a-4e25-9c3a-1d1e2b123456",  
    "name": "Samuel",  
    "profilePhoto": "/api/users/me/profile-photo",  
    "role": "GUEST",  
    "points": 40  
}
```


## Actualizar usuario

```
PUT /api/users/me
```

Actualiza los datos del usuario.

### Request

```text
{  
"name": "Samuel"  
}
```

### Response

```text
{  
"id": "8f8c1b91-3d8a-4e25-9c3a-1d1e2b123456",  
"name": "Samuel",  
"profilePhoto": "/api/users/me/profile-photo",  
"role": "GUEST",  
"points": 40  
}
```

# 📸 Photos

## Obtener fotografías

```
GET /api/photos
```

Obtiene las fotografías aprobadas.

### Query Parameters

| Parámetro   | Tipo    | Obligatorio | Descripción          |
|-------------|---------|-------------|----------------------|
| page        | integer | No          | Página               |
| size        | integer | No          | Número de resultados |
| challengeId | UUID    | No          | Filtrar por reto     |
| userId      | UUID    | No          | Filtrar por usuario  |

### Ejemplo

```
GET /api/photos?page=0&size=20
```

### Response

```text
{  
    "content": [  
        {  
            "id": "2c4c3d7e-5f11-4f18-9f44-123456789abc",  
            "user": {  
            "id": "8f8c1b91-3d8a-4e25-9c3a-1d1e2b123456",  
            "name": "Samuel",  
            "profilePhoto": "/api/users/8f8c1b91-3d8a-4e25-9c3a-1d1e2b123456/profile-photo"  
        },  
            "challenge": {  
            "id": "12345678-1234-1234-1234-123456789abc",  
            "title": "La novia riendo a carcajadas"  
        },  
            "url": "/api/photos/2c4c3d7e-5f11-4f18-9f44-123456789abc/file",  
            "caption": "Menuda risa 😂",  
            "createdAt": "2026-08-23T14:30:00"  
        }  
    ],  
    "page": 0,  
    "size": 20,  
    "totalElements": 1,  
    "totalPages": 1  
}
```


## Subir fotografía

```
POST /api/photos
```

### Content-Type

```
multipart/form-data
```

### Parámetros

| Campo       | Tipo          | Obligatorio | Descripción                 |
|-------------|---------------|-------------|-----------------------------|
| file        | MultipartFile | Sí          | Archivo de imagen           |
| challengeId | UUID          | No          | Reto asociado               |
| caption     | string        | No          | Comentario de la fotografía |

### Ejemplo

```text
file:  
foto.jpg

challengeId:  
12345678-1234-1234-1234-123456789abc

caption:  
¡Menudo momento!
```

### Response

```text
{  
    "id": "2c4c3d7e-5f11-4f18-9f44-123456789abc",  
    "status": "PENDING",  
    "message": "Fotografía subida correctamente"  
}
```
Las fotografías nuevas tendrán inicialmente:

```text
PENDING
```

y deberán ser revisadas por un administrador.



## Obtener fotografía

```
GET /api/photos/{id}
```

### Response

```text
{  
    "id": "2c4c3d7e-5f11-4f18-9f44-123456789abc",  
    "url": "/api/photos/2c4c3d7e-5f11-4f18-9f44-123456789abc/file",  
    "caption": "¡Menudo momento!",  
    "status": "APPROVED",  
    "createdAt": "2026-08-23T14:30:00"  
}
```

## Obtener archivo de fotografía

```
GET /api/photos/{id}/file
```

Devuelve el archivo de imagen.

### Response

```
Content-Type: image/jpeg
```

La API buscará el archivo en el almacenamiento configurado:

```
/data/wedding/photos/
```



## Eliminar fotografía

```
DELETE /api/photos/{id}
```

Un usuario únicamente podrá eliminar sus propias fotografías.

### Response

```
204 No Content
```

# 🖼️ Profile Photos

## Subir foto de perfil

```
POST /api/users/me/profile-photo
```

### Content-Type

```
multipart/form-data
```

### Request

```
file: profile.jpg
```

### Response

```text
{  
    "profilePhoto": "/api/users/me/profile-photo"  
}
```

La fotografía se almacenará en:

```
/data/wedding/profiles/
```

## Obtener foto de perfil

```
GET /api/users/{id}/profile-photo
```

Devuelve la fotografía de perfil del usuario.

### Response

```
Content-Type: image/jpeg
```

# 🎯 Challenges

## Obtener retos

```
GET /api/challenges
```

Obtiene todos los retos activos.

### Response

```text
[  
    {  
        "id": "12345678-1234-1234-1234-123456789abc",  
        "title": "La novia riendo a carcajadas",  
        "description": "Consigue una foto de la novia riéndose.",  
        "points": 10,  
        "position": 1  
    },  
    {  
        "id": "22345678-1234-1234-1234-123456789abc",  
        "title": "Un beso inesperado",  
        "description": "Captura un beso inesperado durante la celebración.",  
        "points": 10,  
        "position": 2  
    }  
]
```


## Obtener reto

```
GET /api/challenges/{id}
```

### Response

```text
{  
    "id": "12345678-1234-1234-1234-123456789abc",  
    "title": "La novia riendo a carcajadas",  
    "description": "Consigue una foto de la novia riéndose.",  
    "points": 10,  
    "position": 1  
}
```


# 🏆 Bingo

## Obtener mi bingo

```
GET /api/bingo/me
```

Devuelve el estado del bingo del usuario.

### Response

```text
{  
    "userId": "8f8c1b91-3d8a-4e25-9c3a-1d1e2b123456",  
    "points": 40,  
    "completed": 4,  
    "total": 25,  
    "progress": 16,  
    "cells": [  
        {  
            "challengeId": "12345678-1234-1234-1234-123456789abc",  
            "position": 1,  
            "status": "COMPLETED",  
            "photoId": "2c4c3d7e-5f11-4f18-9f44-123456789abc"  
        },  
        {  
            "challengeId": null,  
            "position": 13,  
            "status": "FREE"  
        }  
    ]  
}
```


## Obtener progreso de un reto

```
GET /api/bingo/challenges/{challengeId}
```


### Response

```text
{  
    "challengeId": "12345678-1234-1234-1234-123456789abc",  
    "status": "COMPLETED",  
    "photoId": "2c4c3d7e-5f11-4f18-9f44-123456789abc",  
    "points": 10,  
    "completedAt": "2026-08-23T16:20:00"  
}
```


# 👨‍💼 Admin

Todas las rutas `/api/admin/**` requieren permisos de administrador.



# 📸 Admin Photos

## Obtener fotografías pendientes

```
GET /api/admin/photos/pending
```

Obtiene las fotografías que están esperando revisión.

### Response

```text
[  
    {  
        "id": "2c4c3d7e-5f11-4f18-9f44-123456789abc",  
        "user": {  
            "id": "8f8c1b91-3d8a-4e25-9c3a-1d1e2b123456",  
            "name": "Samuel"  
        },  
        "challenge": {  
            "id": "12345678-1234-1234-1234-123456789abc",  
            "title": "La novia riendo a carcajadas"  
        },  
        "url": "/api/photos/2c4c3d7e-5f11-4f18-9f44-123456789abc/file",  
        "caption": "Menuda risa 😂",  
        "status": "PENDING",  
        "createdAt": "2026-08-23T14:30:00"  
    }  
]
```


## Aprobar fotografía

```
POST /api/admin/photos/{id}/approve
```

Aprueba una fotografía.

Al aprobar una fotografía asociada a un reto:

1.  La fotografía pasa a `APPROVED`.
2.  Se completa el reto del usuario.
3.  Se asignan los puntos correspondientes.
4.  Se actualiza el progreso del bingo.

### Response

```text
{  
    "photoId": "2c4c3d7e-5f11-4f18-9f44-123456789abc",  
    "status": "APPROVED",  
    "challengeCompleted": true,  
    "pointsAwarded": 10  
}
```


## Rechazar fotografía

```
POST /api/admin/photos/{id}/reject
```

Rechaza una fotografía.

### Request

```text
{  
    "reason": "La fotografía no corresponde al reto."  
}
```

### Response

```text
{  
    "photoId": "2c4c3d7e-5f11-4f18-9f44-123456789abc",  
    "status": "REJECTED"  
}
```


# 👥 Admin Users

## Obtener usuarios

```
GET /api/admin/users
```

### Query Parameters

| Parámetro | Tipo    | Obligatorio |
|-----------|---------|-------------|
| page      | integer | No          |
| size      | integer | No          |

### Response

```text
{  
    "content": [  
        {  
            "id": "8f8c1b91-3d8a-4e25-9c3a-1d1e2b123456",  
            "name": "Samuel",  
            "role": "GUEST",  
            "points": 40,  
            "photos": 12,  
            "completedChallenges": 4  
        }  
    ],  
    "page": 0,  
    "size": 20,  
    "totalElements": 1,  
    "totalPages": 1  
}
```

## Obtener usuario

```
GET /api/admin/users/{id}
```

Obtiene información detallada de un usuario.



# 🎯 Admin Challenges

## Crear reto

```
POST /api/admin/challenges
```

### Request

```text
{  
    "title": "Una foto con los novios",  
    "description": "Hazte una foto junto a los novios.",  
    "points": 15,  
    "position": 9  
}
```

### Response

```text
{  
    "id": "12345678-1234-1234-1234-123456789abc",  
    "title": "Una foto con los novios",  
    "description": "Hazte una foto junto a los novios.",  
    "points": 15,  
    "position": 9,  
    "active": true  
}
```


## Actualizar reto

```
PUT /api/admin/challenges/{id}
```

### Request

```text
{  
    "title": "Una foto con los novios",  
    "description": "Hazte una foto junto a los novios.",  
    "points": 20,  
    "position": 9,  
    "active": true  
}
```


## Eliminar/desactivar reto

```
DELETE /api/admin/challenges/{id}
```

Los retos no deberían eliminarse físicamente si ya existen fotografías asociadas.

La implementación recomendada es:

```
active = false
```



# 📊 Admin Dashboard

## Obtener estadísticas

```
GET /api/admin/dashboard
```

### Response

```text
{  
"users": 87,  
"photos": 342,  
"pendingPhotos": 21,  
"approvedPhotos": 310,  
"rejectedPhotos": 11,  
"completedChallenges": 156  
}
```



# 📁 Almacenamiento

Las fotografías no se almacenan directamente en PostgreSQL.

PostgreSQL almacena únicamente sus metadatos:

photos  
├── id  
├── user\_id  
├── challenge\_id  
├── filename  
├── path  
├── caption  
├── status  
└── created\_at

Los archivos se almacenan en:

```
/data/wedding/
```

Estructura:

/data/wedding/  
│  
├── photos/  
│   ├── 2026/  
│   │   └── 08/  
│   │       ├── uuid.webp  
│   │       ├── uuid.webp  
│   │       └── uuid.webp  
│  
└── profiles/  
├── uuid.webp  
└── uuid.webp



# 🖼️ Procesamiento de imágenes

La API deberá validar las imágenes antes de almacenarlas.

Validaciones mínimas:

-   El archivo debe ser una imagen.
-   Se debe comprobar el MIME type real.
-   Tamaño máximo configurable.
-   Extensiones permitidas.
-   Generación de nombre único.
-   No utilizar directamente el nombre enviado por el usuario.

Formatos recomendados:

JPEG  
PNG  
WEBP  
HEIC\*

> El soporte HEIC puede requerir procesamiento adicional.



# 🔒 Seguridad

La API deberá:

-   Validar todos los archivos subidos.
-   Limitar el tamaño máximo de las imágenes.
-   Generar nombres aleatorios para los archivos.
-   Nunca utilizar directamente el nombre del archivo enviado.
-   Validar permisos antes de modificar recursos.
-   Evitar acceso directo al sistema de archivos.
-   No devolver rutas físicas del servidor.
-   Utilizar UUID como identificadores.
-   Registrar las acciones administrativas.



# 🔄 Flujo de subida de fotografía

Usuario  
│  
│ Selecciona foto  
▼  
React  
│  
│ POST /api/photos  
▼  
Spring Boot  
│  
├── Validar usuario  
│  
├── Validar imagen  
│  
├── Generar UUID  
│  
├── Guardar archivo  
│  
└── Guardar metadata  
│  
▼  
PostgreSQL  
│  
▼  
status = PENDING



# ✅ Flujo de aprobación

                    ADMIN  
                      │  
                      │  
                      ▼  
              GET /admin/photos/pending  
                      │  
                      ▼  
                ┌───────────┐  
                │ Fotografía│  
                │  PENDING  │  
                └─────┬─────┘  
                      │  
             ┌────────┴────────┐  
             │                 │  
          APPROVE             REJECT  
             │                 │  
             ▼                 ▼  
        APPROVED            REJECTED  
             │  
             ▼  
      Completar reto  
             │  
             ▼  
       Asignar puntos  
             │  
             ▼  
       Actualizar bingo



# 🧱 Capas del Backend

La API seguirá una arquitectura por capas:

Controller  
│  
▼  
Service  
│  
▼  
Repository  
│  
▼  
PostgreSQL

Para las fotografías:

PhotoController  
│  
▼  
PhotoService  
│  
├───────────────┐  
▼               ▼  
PhotoRepository   FileStorageService  
│               │  
▼               ▼  
PostgreSQL       Local Storage



# 💾 FileStorageService

El almacenamiento deberá estar abstraído mediante una interfaz:

interface FileStorageService {

    fun save(  
        file: MultipartFile,  
        path: String  
    ): String  
  
    fun delete(  
        path: String  
    )  
  
    fun get(  
        path: String  
    ): Resource  
}

La V1 utilizará:

```
LocalFileStorageService
```

En el futuro se podrá añadir:

S3StorageService  
CloudflareStorageService

sin modificar la lógica principal de fotografías.



# 🚀 Futuras versiones

La API está diseñada para poder incorporar posteriormente:

-   Firebase Authentication
-   Cloudflare
-   Cloudflare Workers
-   Durable Objects
-   Redis
-   S3
-   CDN
-   Procesamiento automático de imágenes
-   Thumbnails
-   WebSockets / SSE
-   Notificaciones en tiempo real
-   Estadísticas avanzadas

La arquitectura inicial debe mantenerse sencilla hasta que exista una necesidad real de introducir estos servicios.
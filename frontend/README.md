# Nuestra Boda — Frontend (React + Vite + MUI)

Implementación fiel en React + Vite + Material UI de las pantallas diseñadas en Google Stitch.

## Instalación

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Rutas

| Ruta               | Pantalla                          |
|---------------------|------------------------------------|
| `/`                 | Bienvenida                         |
| `/identificacion`   | Identificación (nombre)            |
| `/inicio`           | Inicio (dashboard invitado)        |
| `/bingo`            | Bingo interactivo 5x5              |
| `/fotos`            | Galería de fotos                   |
| `/fotos/subir`      | Subir foto                         |
| `/ranking`          | Ranking / podio                    |
| `/perfil`           | Perfil del invitado                |
| `/admin`            | Dashboard de administración        |
| `/admin/photos`     | Moderación de fotos                |
| `/admin/bingo`      | Gestión de retos del bingo         |
| `/admin/users`      | Usuarios y leaderboard             |

## Estructura

```
src/
├── components/       # MaterialSymbol.jsx (iconos Google Fonts)
├── data/             # mockData.js (datos de ejemplo, a sustituir por API real)
├── layouts/          # GuestLayout (BottomNav), AdminLayout (Drawer)
├── pages/
│   ├── guest/
│   └── admin/
├── router/           # AppRouter.jsx
├── theme/            # theme.js (tokens de color/tipografía de Stitch)
├── App.jsx
└── main.jsx
```

## Notas

- Todos los datos (usuario, fotos, bingo, ranking) son **mock** en `src/data/mockData.js`.
  El siguiente paso es sustituirlos por llamadas a `services/` conectadas a Firebase Auth
  y a la API (ver el documento de especificación del proyecto).
- Los iconos usan la fuente "Material Symbols Outlined" (cargada en `index.html`) a través
  del componente `MaterialSymbol`, igual que en las pantallas originales de Stitch.
- El tema (`src/theme/theme.js`) centraliza todos los colores y tipografías (Playfair Display /
  Montserrat) extraídos de las pantallas para que cualquier ajuste de marca se haga en un
  solo sitio.

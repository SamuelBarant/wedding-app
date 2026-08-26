# ---- Etapa 1: build ----
# node:22-bookworm-slim (glibc) en vez de node:22-alpine (musl):
# Rolldown (el motor de Vite 8) usa un binario nativo en Rust que da
# problemas para resolverse en musl dentro de Docker.
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite incrusta las variables VITE_* en el bundle DURANTE el build,
# no en runtime. Por eso hace falta pasarla como build arg.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ---- Etapa 2: servido con nginx ----
FROM nginx:alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# ---- Etapa 1: build ----
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copiamos primero solo lo necesario para resolver dependencias:
# así Docker cachea esta capa y no re-descarga todo si solo cambia el código.
COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts settings.gradle.kts ./
RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon || true

COPY src src
RUN ./gradlew bootJar --no-daemon -x test

# ---- Etapa 2: ejecución ----
FROM eclipse-temurin:21-jre AS runtime
WORKDIR /app

RUN addgroup --system spring && adduser --system --ingroup spring spring
USER spring:spring

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

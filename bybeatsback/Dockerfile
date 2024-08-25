# Build the Spring Boot application
FROM eclipse-temurin:22-jdk-alpine AS build
WORKDIR /app

# Copy the project files
COPY . /app

# Convert line endings for mvnw
RUN dos2unix /app/mvnw

# Ensure mvnw has executable permissions
RUN chmod +x /app/mvnw

# Test running mvnw
RUN /app/mvnw clean package

# Stage 2: Create the final runtime image
FROM eclipse-temurin:22-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar bybeats.jar

# Expose the Spring Boot application port
EXPOSE 8080

# Start the Spring Boot application
CMD ["java", "-jar", "bybeats.jar"]

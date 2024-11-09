FROM openjdk:17-jdk AS build

WORKDIR /app

COPY mvnw pom.xml lombok.config ./
COPY .mvn .mvn
COPY src ./src

RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jdk
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]

FROM openjdk:17-jdk-alpine as sensor-simulator
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
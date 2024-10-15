FROM openjdk:21-jdk AS build

WORKDIR /app
COPY mvnw pom.xml ./
COPY .mvn .mvn
COPY src ./src
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests


FROM registry.access.redhat.com/ubi8/openjdk-21:1.20 AS final

ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"
ENV JAVA_OPTS_APPEND="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
WORKDIR /deployments
COPY --from=build /app/target/quarkus-app/lib/ /deployments/lib/
COPY --from=build /app/target/quarkus-app/*.jar /deployments/
COPY --from=build /app/target/quarkus-app/app/ /deployments/app/
COPY --from=build /app/target/quarkus-app/quarkus/ /deployments/quarkus/
EXPOSE 8085
USER 185
ENTRYPOINT [ "/opt/jboss/container/java/run/run-java.sh" ]

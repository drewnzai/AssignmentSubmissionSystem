FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} admin.jar
ENTRYPOINT ["java","-jar","/admin.jar"]
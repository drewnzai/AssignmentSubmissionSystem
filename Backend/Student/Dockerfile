FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} student.jar
ENTRYPOINT ["java","-jar","/student.jar"]
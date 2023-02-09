FROM openjdk:18-slim-buster as build-stage
WORKDIR /app
COPY . ./
RUN ./gradlew clean build

FROM openjdk:18-slim-buster
WORKDIR /app
COPY --from=build-stage /app/build/libs/keycloak-authentication-authorization-0.0.1.jar ./
CMD [ "java", "-jar", "keycloak-authentication-authorization-0.0.1.jar" ]

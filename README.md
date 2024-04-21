### Create a basic Spring Boot Project

To generate a basic structure for your Spring Boot project using Spring Initializr, follow these steps:

1. Open the Spring Initializr website: https://start.spring.io/
2. Choose the following options:
   - Project: Maven Project (or Gradle if you prefer)
   - Language: Java
   - Spring Boot: The latest stable version
   - Project Metadata: Fill according to your needs
   - Packaging: Jar
   - Java: 11 or 17
   - Dependencies: Spring Web, Spring Data JPA, H2 Database (or any other SQL database you prefer)
3. Click on the "Generate" button to download the project.
4. Extract the downloaded zip file to your preferred location.
5. Open the project in your IDE (IntelliJ IDEA 2024.1 in your case).

This will give you a basic structure for your Spring Boot project with JPA.


For a Spring Boot Ecommerce API, you would typically need the following dependencies:

1. `Spring Web`: For creating web and RESTful applications.
2. `Spring Data JPA`: To access data layer and perform CRUD operations.
3. `Spring Security`: For authentication and authorization.
4. `Spring Session`: To manage user sessions.
5. `Spring Validation`: For server-side validation.
6. `Database Driver`: Depending on the database you are using, you would need a corresponding driver. For example, if you are using MySQL, you would need `MySQL Driver`.
7. `Spring Boot DevTools`: For automatic restart and live reload during development.
8. `Spring Boot Actuator`: To expose operational information about the running application, like health, metrics, info, dump, env, etc.
9. `Spring Cloud OpenFeign`: To make HTTP requests to external services.
10. `Spring Boot Starter Mail`: For sending emails.
11. `Spring Boot Starter Cache`: For caching data.
12. `Spring Boot Starter Data Redis`: If you are using Redis as your cache or session store.
13. `Spring Boot Starter Oauth2 Client`: If you are implementing OAuth2 based authentication.

Here is how you would add these dependencies in your `build.gradle` file:

```groovy
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    implementation 'org.springframework.cloud:spring-cloud-starter-openfeign'
    implementation 'org.springframework.boot:spring-boot-starter-mail'
    implementation 'org.springframework.boot:spring-boot-starter-cache'
    implementation 'org.springframework.boot:spring-boot-starter-data-redis'
    implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
    runtimeOnly 'mysql:mysql-connector-java'
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

Please replace `'mysql:mysql-connector-java'` with the driver of your choice if you are not using MySQL. Also, remember to add the necessary configuration for these dependencies in your `application.properties` or `application.yml` file.


To build and run your Spring Boot application using Gradle, you can follow these steps:

1. Open a terminal in your project's root directory (where the `build.gradle` file is located).

2. To build the project, run the following command:
```bash
./gradlew build
```
This command compiles your code, runs any tests, and packages your code into a JAR file.

3. To run the application, use the following command:
```bash
./gradlew bootRun
```
This command starts your Spring Boot application.

Please note that you need to have Gradle installed and properly configured on your system to run these commands. If you're using IntelliJ IDEA, it usually comes with a bundled Gradle version that you can use.

spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

Replace your_database_name, your_username, and your_password with your actual database name, username, and password respectively.  The useSSL=false option is used to disable SSL as it's not usually needed for local development. The serverTimezone=UTC option is used to avoid timezone related issues.  The spring.datasource.driver-class-name property is set to com.mysql.cj.jdbc.Driver which is the driver class for MySQL.  Please note that you need to have the MySQL JDBC driver in your project dependencies. If you're using Gradle, you can add it to your build.gradle file like this:

dependencies {
    implementation 'mysql:mysql-connector-java'
}

After making these changes, run ./gradlew build to rebuild your project.


The `application.properties` file should be placed in the `src/main/resources` directory of your project. If the directory does not exist, you should create it. 

Here is the directory structure:

```
ecom/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── bayareala8s/
│   │   │           └── ecom/
│   │   │               └── EcomApplication.java
│   │   └── resources/
│   │       └── application.properties
└── build.gradle
```

In the `application.properties` file, you can add your application-specific configurations such as database connection details.


To create a Dockerfile for your Spring Boot application, you need to follow these steps:

1. Specify the base image. We'll use `openjdk:11-jdk-slim` as the base image, which is a slim version of OpenJDK 11.

2. Set the working directory in the image to `/app`.

3. Copy the `gradlew`, `gradle` folder and the `build.gradle` file from your local system to the Docker image.

4. Run the `./gradlew build` command to build the application inside the Docker image.

5. Copy the built jar file from `build/libs` to the Docker image.

6. Expose the port on which your application runs. Spring Boot applications run on port 8080 by default.

7. Set the entry point. This is the command that will be run when a container is started from your image.

Here is the Dockerfile:

```Dockerfile
# Step 1: Specify the base image
FROM openjdk:11-jdk-slim as build

# Step 2: Set the working directory in the image
WORKDIR /app

# Step 3: Copy the gradlew, gradle folder and the build.gradle file to the Docker image
COPY gradlew .
COPY gradle gradle
COPY build.gradle .

# Step 4: Run the gradle build command
RUN ./gradlew build

# Step 5: Copy the built jar file to the Docker image
COPY build/libs/*.jar app.jar

# Step 6: Expose the port
EXPOSE 8080

# Step 7: Set the entry point
ENTRYPOINT ["java","-jar","app.jar"]
```

Please note that this Dockerfile assumes that you are running the `docker build` command from the root directory of your project. If you are running it from a different directory, you may need to adjust the paths in the `COPY` commands.


To create a Dockerfile for your Spring Boot application using the non-slim version of OpenJDK, you can follow these steps:

1. Specify the base image. We'll use `openjdk:11-jdk` as the base image, which is the full version of OpenJDK 11.

2. Set the working directory in the image to `/app`.

3. Copy the `gradlew`, `gradle` folder and the `build.gradle` file from your local system to the Docker image.

4. Run the `./gradlew build` command to build the application inside the Docker image.

5. Copy the built jar file from `build/libs` to the Docker image.

6. Expose the port on which your application runs. Spring Boot applications run on port 8080 by default.

7. Set the entry point. This is the command that will be run when a container is started from your image.

Here is the Dockerfile:

```Dockerfile
# Step 1: Specify the base image
FROM openjdk:11-jdk as build

# Step 2: Set the working directory in the image
WORKDIR /app

# Step 3: Copy the gradlew, gradle folder and the build.gradle file to the Docker image
COPY gradlew .
COPY gradle gradle
COPY build.gradle .

# Step 4: Run the gradle build command
RUN ./gradlew build

# Step 5: Copy the built jar file to the Docker image
COPY build/libs/*.jar app.jar

# Step 6: Expose the port
EXPOSE 8080

# Step 7: Set the entry point
ENTRYPOINT ["java","-jar","app.jar"]
```

Please note that this Dockerfile assumes that you are running the `docker build` command from the root directory of your project. If you are running it from a different directory, you may need to adjust the paths in the `COPY` commands.

The `Dockerfile` should be placed in the root directory of your project. Here is how your project directory structure should look like with the `Dockerfile`:

```
ecom/
├── Dockerfile
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── bayareala8s/
│   │   │           └── ecom/
│   │   │               └── EcomApplication.java
│   │   └── resources/
│   │       └── application.properties
└── build.gradle
```

Placing the `Dockerfile` in the root directory of your project allows Docker to access all the files and directories it needs to build the Docker image.


To create a Docker Compose file for the latest version of MySQL, you can follow these steps:

1. Create a new file named `docker-compose.yml` in the root directory of your project.

2. In this file, define a service named `db` (or any name you prefer) that uses the `mysql:latest` image.

3. Specify the environment variables for the MySQL service. These include `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`, and `MYSQL_PASSWORD`.

4. Expose the port on which MySQL runs (default is 3306).

Here is the Docker Compose file:

```yaml
version: '3.1'

services:
  db:
    image: mysql:latest
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: ecom-app-dev-mysqldb-instance
      MYSQL_USER: bayareala8s
      MYSQL_PASSWORD: bayareala8s
    ports:
      - 3306:3306
```

Please replace `rootpassword`, `ecom-app-dev-mysqldb-instance`, `bayareala8s`, and `bayareala8s` with your actual root password, database name, username, and password respectively.


The `docker-compose.yml` file should be placed in the root directory of your project. This allows Docker Compose to access all the files and directories it needs to build the Docker images and orchestrate the containers. Here is how your project directory structure should look like with the `docker-compose.yml`:

```
ecom-app/
├── Dockerfile
├── docker-compose.yml
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── bayareala8s/
│   │   │           └── ecom/
│   │   │               └── EcomApplication.java
│   │   └── resources/
│   │       └── application.properties
└── build.gradle
```

To test the health check for your Spring Boot application, you can use the Actuator dependency which provides several built-in health checks. If you haven't already added the Actuator dependency to your project, you can do so by adding the following line to your `build.gradle` file:

```groovy
implementation 'org.springframework.boot:spring-boot-starter-actuator'
```

After adding the Actuator dependency, you need to enable the health endpoint in your `application.properties` file:

```ini
management.endpoints.web.exposure.include=health
```

Now, you can test the health check of your application by sending a GET request to the `/actuator/health` endpoint. You can do this using a tool like curl, Postman, or even your web browser. Here's how you can do it with curl:

```bash
curl http://localhost:8080/actuator/health
```

Replace `8080` with the port your application is running on if it's different. The response will indicate the status of your application. A typical response might look like this:

```json
{
  "status": "UP"
}
```

This indicates that your application is running and healthy. If there are any issues with your application, the status will be `DOWN` and additional details about the issue will be provided.



# Enterprise-Standard-Kafka-and-Spring-Boot
Complete code related to Kafka using Spring Boot.

## H2 Database

- Access the h2 database in the following link - http://localhost:8081/h2-console

## Kafka SetUp
- [Setup-Kafka-Using-Docker](SetUpKafkaDocker.md)

## Securing Kafka Cluster using SSL

- [Kafka SSL SetUp](https://github.com/dilipsundarraj1/kafka-cluster-ssl)


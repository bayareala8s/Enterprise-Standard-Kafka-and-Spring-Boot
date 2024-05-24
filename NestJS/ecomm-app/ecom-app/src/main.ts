import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('User Management Service API') // API Name
    .setDescription('This API provides comprehensive features for managing user accounts in an application. It supports operations such as creating new users, updating user information, retrieving user details, and deleting users. It is designed with security and ease-of-use in mind, making it ideal for applications that require robust user management functionality.')
    .setVersion('v1') // API Version
    .addTag('UserService') // API Tag
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Comercial')
    .setDescription('Documentación de nuestra API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentos', app, document);

  // Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // evita campos extras en el Payload al crear
      forbidNonWhitelisted: true,
      //disableErrorMessages: true, 
      transformOptions:{
        enableImplicitConversion:true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();

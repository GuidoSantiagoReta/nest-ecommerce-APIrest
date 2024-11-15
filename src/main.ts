import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); //Admintir Serialización
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Comercial')
    .setDescription('Documentación de nuestra API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentos', app, document);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, //lanzar error en caso de que existan datos prohibidos
      // disableErrorMessages: true,
      transformOptions: {
        enableImplicitConversion: true, //Convierte a cadena de caracteres numericas si existe
      }
    }),
  );
  await app.listen(3000);
}
bootstrap();

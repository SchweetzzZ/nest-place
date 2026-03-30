import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Market Nest API')
    .setDescription('Market Nest API')
    .setVersion('1.0')
    .addTag('market-nest')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    credentials: true,
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

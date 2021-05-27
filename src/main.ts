import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
//import { runInCluster } from './utils/runInCluster';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  //app.setGlobalPrefix('api');
  //app.enableCors();
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  // if (process.env.NODE_ENV === 'development') {
  //   app.enableCors();
  // } else {
  //   app.enableCors({ origin: serverConfig.origin });
  // }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest MKMR')
    .setDescription('Nest API')
    .setVersion('1.0')
    .addTag('items')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`Nest API is listening on port ${port}`);
}
bootstrap();

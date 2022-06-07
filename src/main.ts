import { Options, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  DocumentBuilder,
  ExpressSwaggerCustomOptions,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule
} from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const config = new DocumentBuilder()
    .setTitle('PrimaKu Code Test')
    .setDescription('PrimaKu Code Test API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT'
    )
    .build()
  const options: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'none' }
  }
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document, options)

  await app.listen(process.env.PORT || 3000)
}

bootstrap()

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import { AppModule } from './app.module';
import * as helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle("Swagger")
  .build()

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.use(helmet());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

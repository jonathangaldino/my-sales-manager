import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupCors } from './config/cors';
import { setupHelmet } from './config/security';
import { setupSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  setupHelmet(app);
  setupCors(app);

  await app.listen(3000);
}
bootstrap();

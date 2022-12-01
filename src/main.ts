import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TokenInterceptor } from './interceptors/token/token.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TokenInterceptor());
  await app.listen(3000);
}
bootstrap();

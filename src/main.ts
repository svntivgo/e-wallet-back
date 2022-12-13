import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { TokenVerificationGuard } from './guards/token-verification.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new TokenVerificationGuard());
  app.useGlobalInterceptors(new TokenInterceptor());
  await app.listen(3000);
}
bootstrap();

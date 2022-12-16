import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { TokenVerificationGuard } from './guards/token-verification.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { QueryFailedErrorExceptionFilter } from './filters/query-failed-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new TokenVerificationGuard());
  app.useGlobalInterceptors(new TokenInterceptor());
  app.useGlobalFilters(new QueryFailedErrorExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('eWallet')
    .setDescription('Documentación de eWallet API')
    .setVersion('1.0')
    .addTag('eWallet')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

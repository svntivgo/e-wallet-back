import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpReq = context.switchToHttp();
    const request = httpReq.getRequest();
    const bearer: string = request.header('Authorization');
    const token = bearer.replace('Bearer ', '').trim();
    console.log('Interceptor before: ', token);

    return next.handle().pipe(
      map((x) => {
        const response = httpReq.getResponse();
        console.log('Interceptor after: ', x);
      }),
    );
  }
}

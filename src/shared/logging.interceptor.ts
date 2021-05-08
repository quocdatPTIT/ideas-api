import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Bat dau request');
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    console.log(context.switchToHttp().getRequest().url);
    const url = req.url;
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `Response: ${method} ${url} ${Date.now() - now}ms`,
            context.getClass().name,
          ),
        ),
      );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.catchE(err);
          }
        }
      )
    );
  }
  private catchE(err: HttpErrorResponse) {
    switch (err.status) {
      case 500:
        this.router.navigate(['/error/500']);
        break;
      case 404:
        // this.router.navigate(['/error/404']);
        console.log(err.status, err.message);
        break;
      default:
        console.log(err.status, err.message);
        break;
    }
  }
}

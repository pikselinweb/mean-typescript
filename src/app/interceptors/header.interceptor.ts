import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '@env/environment';

export class AuthHeaderInterceptor implements HttpInterceptor {
  readonly TOKEN_KEY = environment.localStoreKeys.userTokenKey;
  constructor(private localStorage: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const tokenVal = this.localStorage.retrieve(this.TOKEN_KEY);
    const clonedRequest = req.clone({
      headers: req.headers.set(
        'Authorization',
        tokenVal ? `Bearer ${tokenVal}` : ''
      )
    });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}

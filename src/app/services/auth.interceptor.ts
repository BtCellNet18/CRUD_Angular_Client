import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, ) { }

  intercept(req: HttpRequest<any>,
  next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isLoggedIn()) {
      const clone = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.token)
      });

      return next.handle(clone);
    } else {
      return next.handle(req);
    }
  }
}

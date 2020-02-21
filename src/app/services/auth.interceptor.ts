import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, ) { }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.storageService.isTokenValid()) {
      const clone = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.storageService.token)
      });

      return next.handle(clone);
    } else {
      return next.handle(req);
    }
  }
}

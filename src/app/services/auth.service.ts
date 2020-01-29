import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {
    this.url += '/auth';
  }
 
  get token(): string {
    return localStorage.getItem('TOKEN');
  }

  set token(token: string) {
    localStorage.setItem('TOKEN', token);
  } 

  get payload() {
    return jwt_decode(this.token);
  }

  get timestamp(): number {
    return new Date().getTime() / 1000;
  } 

  get username(): string {
    return this.payload.sub;
  }

  login(username: string, password: string): any {
    const credentials = {username: username, password: password};
    return this.http.post(`${this.url}`, credentials);
  }

  logout() {
    localStorage.removeItem('TOKEN');
  }

  isLoggedIn() {
    if (this.token && this.payload.exp > this.timestamp) {
      return true;
    } else {
      return false;
    }
  }  
}

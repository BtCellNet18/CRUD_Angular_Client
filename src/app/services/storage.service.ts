import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static TOKEN_KEY = 'TOKEN';

  constructor() { }

  get token(): string {
    return localStorage.getItem(StorageService.TOKEN_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(StorageService.TOKEN_KEY, token);
  }

  removeToken() {
    localStorage.removeItem(StorageService.TOKEN_KEY);
  }

  isTokenValid() {
    if (this.token && this.payload.exp > this.timestamp) {
      return true;
    } else {
      return false;
    }
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

  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

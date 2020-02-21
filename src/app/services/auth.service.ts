import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {
    this.url += '/auth';
  }

  login(username: string, password: string): any {
    const credentials = {username, password};
    return this.http.post(`${this.url}`, credentials);
  }
}

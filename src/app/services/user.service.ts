import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {
    this.url += '/users';
  }

  getAll(): Observable<any> {
    return this.http.get(this.url);
  }

  getByID(id: number): any {
    return this.http.get(`${this.url}/${id}`);
  }

  create(value: any): any {
    return this.http.post(`${this.url}`, value);
  }

  update(value: any): any {
    return this.http.put(`${this.url}/${value.id}`, value);
  }

  delete(id: number): any {
    return this.http.delete(`${this.url}/${id}`);
  }
}

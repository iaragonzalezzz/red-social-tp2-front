import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  apiUrl = 'https://red-social-tp2-back.onrender.com/auth';

  constructor(private http: HttpClient) {}

  login(datos: any) {
    return this.http.post(`${this.apiUrl}/login`, datos);
  }

  registro(datos: any) {
    return this.http.post(`${this.apiUrl}/registro`, datos);
  }

  autorizar() {
  const token = localStorage.getItem('token');

  return this.http.post(
    `${this.apiUrl}/autorizar`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  } 

refrescar() {
  const token = localStorage.getItem('token');

  return this.http.post(
    `${this.apiUrl}/refrescar`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

}
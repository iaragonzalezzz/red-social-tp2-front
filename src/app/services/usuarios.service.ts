import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  private apiUrl = 'https://red-social-tp2-back.onrender.com/usuarios';

  constructor(private http: HttpClient) {}

  obtenerHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  listar() {
    return this.http.get(
      this.apiUrl,
      this.obtenerHeaders()
    );
  }

  crear(data: any) {
    return this.http.post(
      this.apiUrl,
      data,
      this.obtenerHeaders()
    );
  }

  deshabilitar(id: string) {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.obtenerHeaders()
    );
  }

  habilitar(id: string) {
    return this.http.post(
      `${this.apiUrl}/${id}/habilitar`,
      {},
      this.obtenerHeaders()
    );
  }

  buscarPerfil(id: string) {
  return this.http.get(
    `${this.apiUrl}/${id}/perfil`,
    this.obtenerHeaders()
  );
  }

  listarActivos() {
  return this.http.get(`${this.apiUrl}/activos/listar`);
  }
}
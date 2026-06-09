import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  apiUrl = 'https://red-social-tp2-back.onrender.com/comentarios';

  constructor(private http: HttpClient) {}

  obtenerHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  listar(
    publicacionId: string,
    offset = 0,
    limit = 5,
  ) {
    return this.http.get(
      `${this.apiUrl}/${publicacionId}/comentarios?offset=${offset}&limit=${limit}`,
      this.obtenerHeaders()
    );
  }

  crear(
    publicacionId: string,
    mensaje: string,
  ) {
    return this.http.post(
      `${this.apiUrl}/${publicacionId}/comentarios`,
      { mensaje },
      this.obtenerHeaders()
    );
  }

  editar(
    publicacionId: string,
    comentarioId: string,
    mensaje: string,
  ) {
    return this.http.put(
      `${this.apiUrl}/${publicacionId}/comentarios/${comentarioId}`,
      { mensaje },
      this.obtenerHeaders()
    );
  }
}
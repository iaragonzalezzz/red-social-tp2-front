import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasService {
  private apiUrl = 'https://red-social-tp2-back.onrender.com/estadisticas';

  constructor(private http: HttpClient) {}

  headers() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  publicacionesPorUsuario(desde: string, hasta: string) {
    return this.http.get(
      `${this.apiUrl}/publicaciones-por-usuario?desde=${desde}&hasta=${hasta}`,
      this.headers(),
    );
  }

  comentariosTotal(desde: string, hasta: string) {
    return this.http.get(
      `${this.apiUrl}/comentarios-total?desde=${desde}&hasta=${hasta}`,
      this.headers(),
    );
  }

  comentariosPorPublicacion(desde: string, hasta: string) {
    return this.http.get(
      `${this.apiUrl}/comentarios-por-publicacion?desde=${desde}&hasta=${hasta}`,
      this.headers(),
    );
  }

  loginsPorUsuario(desde: string, hasta: string) {
    return this.http.get(
      `${this.apiUrl}/logins-por-usuario?desde=${desde}&hasta=${hasta}`,
      this.headers(),
    );
  }

  visitasPerfil(desde: string, hasta: string) {
    return this.http.get(
      `${this.apiUrl}/visitas-perfil?desde=${desde}&hasta=${hasta}`,
      this.headers(),
    );
  }

  likesPorDia(desde: string, hasta: string) {
    return this.http.get(
      `${this.apiUrl}/likes-por-dia?desde=${desde}&hasta=${hasta}`,
      this.headers(),
    );
  }
}
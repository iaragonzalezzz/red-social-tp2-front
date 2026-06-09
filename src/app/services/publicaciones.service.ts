import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  apiUrl = 'https://red-social-tp2-back.onrender.com/publicaciones';

  constructor(private http: HttpClient) {}

  listar(orden = 'fecha', offset = 0, limit = 5) {
    return this.http.get(
      `${this.apiUrl}?orden=${orden}&offset=${offset}&limit=${limit}`,
    );
  }

  buscarPorId(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  crear(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }

  darLike(id: string) {
    return this.http.post(`${this.apiUrl}/${id}/like`, {});
  }

  quitarLike(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}/like`);
  }

  eliminar(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  misUltimas() {
    return this.http.get(`${this.apiUrl}/mis-ultimas`);
  }

  ultimasPorUsuario(usuarioId: string) {
    return this.http.get(
      `${this.apiUrl}?usuarioId=${usuarioId}&orden=fecha&offset=0&limit=3`,
    );
  }

  guardar(id: string) {
    return this.http.post(`${this.apiUrl}/${id}/guardar`, {});
  }

  quitarGuardado(id: string) {
    return this.http.post(`${this.apiUrl}/${id}/quitar-guardado`, {});
  }

  misGuardados() {
    return this.http.get(`${this.apiUrl}/mis-guardados/listar`);
  }

  compartir(id: string, usuarioDestino: string) {
    return this.http.post(
      `${this.apiUrl}/${id}/compartir`,
      { usuarioDestino },
    );
  }

  compartidosConmigo() {
    return this.http.get(`${this.apiUrl}/compartidos/conmigo`);
  }
}
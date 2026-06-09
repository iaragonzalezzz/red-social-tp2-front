import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PublicacionesService } from '../../services/publicaciones.service';
import { ComentariosService } from '../../services/comentarios.service';

@Component({
  selector: 'app-publicacion-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './publicacion-detalle.html',
  styleUrl: './publicacion-detalle.css',
})
export class PublicacionDetalle implements OnInit {
  publicacion: any;
  comentarios: any[] = [];

  nuevoComentario = '';

  offset = 0;
  limit = 5;

  usuarioActual: any;

  comentarioEditando: string | null = null;
  mensajeEditado = '';

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PublicacionesService,
    private comentariosService: ComentariosService,
  ) {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      this.usuarioActual = JSON.parse(usuario);
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.cargarPublicacion(id);
      this.cargarComentarios(id);
    }
  }

  cargarPublicacion(id: string) {
    this.publicacionesService
      .buscarPorId(id)
      .subscribe((respuesta: any) => {
        this.publicacion = respuesta;
      });
  }

  cargarComentarios(id: string) {
    this.comentariosService
      .listar(id, this.offset, this.limit)
      .subscribe((respuesta: any) => {
        this.comentarios = [
          ...this.comentarios,
          ...respuesta,
        ];
      });
  }

  cargarMas() {
    this.offset += this.limit;
    this.cargarComentarios(this.publicacion._id);
  }

  comentar() {
    if (!this.nuevoComentario.trim()) {
      return;
    }

    this.comentariosService
      .crear(this.publicacion._id, this.nuevoComentario)
      .subscribe(() => {
        this.nuevoComentario = '';
        this.comentarios = [];
        this.offset = 0;

        this.cargarComentarios(this.publicacion._id);
      });
  }

  iniciarEdicion(comentario: any) {
    this.comentarioEditando = comentario._id;
    this.mensajeEditado = comentario.mensaje;
  }

  guardarEdicion(comentario: any) {
    this.comentariosService
      .editar(
        this.publicacion._id,
        comentario._id,
        this.mensajeEditado,
      )
      .subscribe(() => {
        comentario.mensaje = this.mensajeEditado;
        comentario.modificado = true;
        this.comentarioEditando = null;
      });
  }
}
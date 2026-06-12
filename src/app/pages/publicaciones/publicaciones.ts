import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PublicacionesService } from '../../services/publicaciones.service';
import { PublicacionComponent } from '../../components/publicacion/publicacion';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    PublicacionComponent,
  ],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})
export class Publicaciones implements OnInit {

  usuario: any;

  publicaciones: any[] = [];

  titulo = '';
  mensaje = '';

  imagen!: File;
  nombreImagen = '';

  orden = 'fecha';

  offset = 0;
  limit = 5;

  cargando = false;
  hayMas = true;

  constructor(
    private router: Router,
    private publicacionesService: PublicacionesService,
  ) {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
  }

  ngOnInit() {
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    if (this.cargando || !this.hayMas) {
      return;
    }

    this.cargando = true;

    this.publicacionesService
      .listar(
        this.orden,
        this.offset,
        this.limit,
      )
      .subscribe((respuesta: any) => {

        this.publicaciones = [
          ...this.publicaciones,
          ...respuesta,
        ];

        if (respuesta.length < this.limit) {
          this.hayMas = false;
        }

        this.cargando = false;
      });
  }

  recargarPublicaciones() {
    this.offset = 0;
    this.publicaciones = [];
    this.hayMas = true;

    this.cargarPublicaciones();
  }

  cambiarOrden() {
    this.recargarPublicaciones();
  }

  alHacerScroll() {
    const posicionActual =
      window.innerHeight + window.scrollY;

    const altoDocumento =
      document.body.offsetHeight;

    const cercaDelFinal =
      posicionActual >= altoDocumento - 200;

    if (
      cercaDelFinal &&
      !this.cargando &&
      this.hayMas
    ) {
      this.offset += this.limit;
      this.cargarPublicaciones();
    }
  }

  seleccionarImagen(event: any) {
    const archivo = event.target.files[0];

    if (archivo) {
      this.imagen = archivo;
      this.nombreImagen = archivo.name;
    }
  }

  crearPublicacion() {
    const formData = new FormData();

    formData.append('titulo', this.titulo);
    formData.append('mensaje', this.mensaje);

    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }

    this.publicacionesService
      .crear(formData)
      .subscribe(() => {
        this.titulo = '';
        this.mensaje = '';
        this.imagen = undefined as any;
        this.nombreImagen = '';

        this.recargarPublicaciones();
      });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { PublicacionesService } from '../../services/publicaciones.service';
import { PublicacionComponent } from '../../components/publicacion/publicacion';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PublicacionComponent,
  ],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export class MiPerfil implements OnInit {

  usuario: any;
  publicaciones: any[] = [];

  constructor(
    private publicacionesService: PublicacionesService,
    private router: Router
  ) {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
  }

  ngOnInit() {
    this.cargarMisPublicaciones();
  }

  cargarMisPublicaciones() {
  this.publicacionesService
    .misUltimas()
    .subscribe((respuesta: any) => {
      this.publicaciones = respuesta.map((publicacion: any) => ({
        ...publicacion,
        usuario: publicacion.usuario?._id
          ? publicacion.usuario
          : this.usuario,
      }));
    });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
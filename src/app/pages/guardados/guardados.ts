import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PublicacionesService } from '../../services/publicaciones.service';
import { PublicacionComponent } from '../../components/publicacion/publicacion';

@Component({
  selector: 'app-guardados',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PublicacionComponent,
  ],
  templateUrl: './guardados.html',
  styleUrl: './guardados.css',
})
export class Guardados implements OnInit {

  usuario: any;
  publicaciones: any[] = [];

  constructor(
    private publicacionesService: PublicacionesService
  ) {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
  }

  ngOnInit() {
    this.cargarGuardados();
  }

  cargarGuardados() {
    this.publicacionesService
      .misGuardados()
      .subscribe((respuesta: any) => {
        this.publicaciones = respuesta;
      });
  }
}
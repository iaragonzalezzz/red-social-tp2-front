import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PublicacionesService } from '../../services/publicaciones.service';
import { PublicacionComponent } from '../../components/publicacion/publicacion';

@Component({
  selector: 'app-compartidos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PublicacionComponent,
  ],
  templateUrl: './compartidos.html',
  styleUrl: './compartidos.css',
})
export class Compartidos implements OnInit {

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
    this.cargarCompartidos();
  }

  cargarCompartidos() {
    this.publicacionesService
      .compartidosConmigo()
      .subscribe((respuesta: any) => {
        this.publicaciones = respuesta;
      });
  }

  quienCompartio(publicacion: any) {
    const compartido = publicacion.compartidos?.find(
      (item: any) =>
        item.usuarioDestino === this.usuario?._id ||
        item.usuarioDestino?._id === this.usuario?._id
    );

    return compartido?.usuarioQueComparte;
  }
}
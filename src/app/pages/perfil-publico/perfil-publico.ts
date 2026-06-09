import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { UsuariosService } from '../../services/usuarios.service';
import { PublicacionesService } from '../../services/publicaciones.service';
import { PublicacionComponent } from '../../components/publicacion/publicacion';

@Component({
  selector: 'app-perfil-publico',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PublicacionComponent,
  ],
  templateUrl: './perfil-publico.html',
  styleUrl: './perfil-publico.css',
})
export class PerfilPublico implements OnInit {

  usuario: any;
  usuarioActual: any;
  publicaciones: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private publicacionesService: PublicacionesService,
  ) {
    const guardado = localStorage.getItem('usuario');

    if (guardado) {
      this.usuarioActual = JSON.parse(guardado);
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.cargarPerfil(id);
      this.cargarPublicaciones(id);
    }
  }

  cargarPerfil(id: string) {
    this.usuariosService
      .buscarPerfil(id)
      .subscribe((respuesta: any) => {
        this.usuario = respuesta;
      });
  }

  cargarPublicaciones(id: string) {
    this.publicacionesService
      .ultimasPorUsuario(id)
      .subscribe((respuesta: any) => {
        this.publicaciones = respuesta;
      });
  }
}

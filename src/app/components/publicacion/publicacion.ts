import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PublicacionesService } from '../../services/publicaciones.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class PublicacionComponent {

  @Input() publicacion: any;
  @Input() usuarioActual: any;

  @Output() actualizar = new EventEmitter<void>();

  usuarios: any[] = [];
  mostrarCompartir = false;
  usuarioDestino = '';

  constructor(
    private publicacionesService: PublicacionesService,
    private usuariosService: UsuariosService,
  ) {}

  dioLike() {
    return this.publicacion.likes?.some(
      (like: any) =>
        like.usuario?.toString() === this.usuarioActual?._id ||
        like.usuario?._id === this.usuarioActual?._id ||
        like === this.usuarioActual?._id
    );
  }

  estaGuardada() {
    return this.publicacion.guardados?.some(
      (id: any) =>
        id?.toString() === this.usuarioActual?._id ||
        id?._id === this.usuarioActual?._id
    );
  }

  cantidadLikes() {
    return this.publicacion.likes?.length || 0;
  }

  cantidadGuardados() {
    return this.publicacion.guardados?.length || 0;
  }

  cantidadCompartidos() {
    return this.publicacion.compartidos?.length || 0;
  }

  cambiarLike() {
    if (this.dioLike()) {
      this.publicacionesService
        .quitarLike(this.publicacion._id)
        .subscribe(() => this.actualizar.emit());
    } else {
      this.publicacionesService
        .darLike(this.publicacion._id)
        .subscribe(() => this.actualizar.emit());
    }
  }

  cambiarGuardado() {
    if (this.estaGuardada()) {
      this.publicacionesService
        .quitarGuardado(this.publicacion._id)
        .subscribe(() => this.actualizar.emit());
    } else {
      this.publicacionesService
        .guardar(this.publicacion._id)
        .subscribe(() => this.actualizar.emit());
    }
  }

  abrirCompartir() {
    this.mostrarCompartir = true;

    this.usuariosService
      .listarActivos()
      .subscribe((data: any) => {
        this.usuarios = data.filter(
          (usuario: any) =>
            usuario._id !== this.usuarioActual?._id
        );
      });
  }

  compartir() {
    if (!this.usuarioDestino) {
      return;
    }

    this.publicacionesService
      .compartir(
        this.publicacion._id,
        this.usuarioDestino,
      )
      .subscribe(() => {
        this.mostrarCompartir = false;
        this.usuarioDestino = '';
        this.actualizar.emit();
      });
  }

  puedeEliminar() {
    const autorId =
      this.publicacion.usuario?._id ||
      this.publicacion.usuario;

    return (
      autorId === this.usuarioActual?._id ||
      this.usuarioActual?.perfil === 'administrador'
    );
  }

  eliminar() {
    this.publicacionesService
      .eliminar(this.publicacion._id)
      .subscribe(() => this.actualizar.emit());
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { EstadoUsuarioPipe } from '../../pipes/estado-usuario-pipe';
import { PerfilNombrePipe } from '../../pipes/perfil-nombre-pipe';
import { ResaltarDirective } from '../../directives/resaltar';
import { SombraDirective } from '../../directives/sombra';


@Component({
  selector: 'app-dashboard-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, EstadoUsuarioPipe, PerfilNombrePipe, ResaltarDirective, SombraDirective,],
  templateUrl: './dashboard-usuarios.html',
  styleUrl: './dashboard-usuarios.css',
})
export class DashboardUsuarios implements OnInit {

  usuarios: any[] = [];

  nombre = '';
  apellido = '';
  correo = '';
  nombreUsuario = '';
  password = '';
  perfil = 'usuario';

  constructor(
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {

    this.usuariosService.listar().subscribe({
      next: (data: any) => {
        this.usuarios = data;
      },
    });
  }

  crearUsuario() {

    const data = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      nombreUsuario: this.nombreUsuario,
      password: this.password,
      repetirPassword: this.password,
      perfil: this.perfil,
    };

    this.usuariosService.crear(data).subscribe({
      next: () => {

        this.obtenerUsuarios();

        this.nombre = '';
        this.apellido = '';
        this.correo = '';
        this.nombreUsuario = '';
        this.password = '';
        this.perfil = 'usuario';
      },
    });
  }

  deshabilitar(id: string) {

    this.usuariosService
      .deshabilitar(id)
      .subscribe(() => {
        this.obtenerUsuarios();
      });
  }

  habilitar(id: string) {

    this.usuariosService
      .habilitar(id)
      .subscribe(() => {
        this.obtenerUsuarios();
      });
  }
}
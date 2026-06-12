import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  nombre = '';
  apellido = '';
  correo = '';
  nombreUsuario = '';
  password = '';
  repetirPassword = '';
  fechaNacimiento = '';
  descripcion = '';

  fotoPerfil!: File;
  nombreFotoPerfil = '';

  mensajeError = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  seleccionarImagen(event: any) {
    const archivo = event.target.files[0];

    if (archivo) {
      this.fotoPerfil = archivo;
      this.nombreFotoPerfil = archivo.name;
    }
  }

  passwordInvalida() {

    const regex =
      /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    return (
      this.password &&
      !regex.test(this.password)
    );
  }

  registrarse() {

    const formData = new FormData();

    formData.append('nombre', this.nombre);
    formData.append('apellido', this.apellido);
    formData.append('correo', this.correo);
    formData.append('nombreUsuario', this.nombreUsuario);
    formData.append('password', this.password);
    formData.append('repetirPassword', this.repetirPassword);
    formData.append('fechaNacimiento', this.fechaNacimiento);
    formData.append('descripcion', this.descripcion);

    if (this.fotoPerfil) {
      formData.append(
        'fotoPerfil',
        this.fotoPerfil
      );
    }

    this.authService.registro(formData).subscribe({

      next: (respuesta: any) => {

        localStorage.setItem(
          'token',
          respuesta.token
        );

        localStorage.setItem(
          'usuario',
          JSON.stringify(respuesta.usuario)
        );

        this.router.navigate(['/publicaciones']);
      },

      error: (error) => {

        this.mensajeError =
          error.error.message;
      },
    });
  }
}
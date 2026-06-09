import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login{

  usuarioOCorreo = '';
  password = '';

  mensajeError = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion() {

    const body = {
      usuarioOCorreo: this.usuarioOCorreo,
      password: this.password,
    };

    this.authService.login(body).subscribe({
      next: (respuesta: any) => {

        localStorage.setItem('token', respuesta.token);

        localStorage.setItem(
          'usuario',
          JSON.stringify(respuesta.usuario)
        );

        this.router.navigate(['/publicaciones']);
      },

      error: (error) => {
        this.mensajeError = error.error.message;
      },
    });
  }
}
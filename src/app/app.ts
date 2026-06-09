import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {

  mostrarModal = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {

    const token = localStorage.getItem('token');

    if (!token) return;

    setTimeout(() => {

      this.mostrarModal = true;

    }, 10 * 60 * 1000);
  }

  extenderSesion() {

    this.authService.refrescar().subscribe({

      next: (respuesta: any) => {

        localStorage.setItem(
          'token',
          respuesta.token,
        );

        this.mostrarModal = false;

        alert('Sesión extendida correctamente');
      },

      error: () => {

        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        this.router.navigate(['/login']);
      },
    });
  }

  cerrarSesion() {

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }
}
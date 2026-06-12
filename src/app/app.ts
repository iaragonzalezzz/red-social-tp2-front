import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class App implements OnInit, OnDestroy {

  mostrarModal = false;
  refrescando = false;

  private temporizadorSesion: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.iniciarTemporizadorSesion();
  }

  ngOnDestroy() {
    clearTimeout(this.temporizadorSesion);
  }

  iniciarTemporizadorSesion() {
    clearTimeout(this.temporizadorSesion);

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    this.temporizadorSesion = setTimeout(() => {
      this.mostrarModal = true;
    }, 10 * 60 * 1000);
  }

  extenderSesion() {
    this.refrescando = true;

    this.authService.refrescar().subscribe({
      next: (respuesta: any) => {
        localStorage.setItem('token', respuesta.token);

        this.mostrarModal = false;
        this.refrescando = false;

        this.iniciarTemporizadorSesion();
      },

      error: () => {
        this.refrescando = false;
        this.cerrarSesion();
      },
    });
  }

  cerrarSesion() {
    clearTimeout(this.temporizadorSesion);

    this.mostrarModal = false;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }
}
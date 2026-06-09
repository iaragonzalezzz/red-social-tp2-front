import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cargando',
  standalone: true,
  imports: [],
  templateUrl: './cargando.html',
  styleUrl: './cargando.css',
})
export class Cargando implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.autorizar().subscribe({
      next: (respuesta: any) => {
        localStorage.setItem(
          'usuario',
          JSON.stringify(respuesta.usuario)
        );

        this.router.navigate(['/publicaciones']);
      },

      error: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.router.navigate(['/login']);
      },
    });
  }
}
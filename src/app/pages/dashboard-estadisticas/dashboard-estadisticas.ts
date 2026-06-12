import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

import { EstadisticasService } from '../../services/estadisticas.service';

@Component({
  selector: 'app-dashboard-estadisticas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-estadisticas.html',
  styleUrl: './dashboard-estadisticas.css',
})
export class DashboardEstadisticas {
  desde = '';
  hasta = '';

  graficos: Chart[] = [];

  constructor(private estadisticasService: EstadisticasService) {}

  cargarEstadisticas() {
    this.borrarGraficos();

    this.graficoPublicaciones();
    this.graficoComentariosTotal();
    this.graficoComentariosPorPublicacion();

    this.graficoLoginsPorUsuario();
    this.graficoVisitasPerfil();
    this.graficoLikesPorDia();
  }

  borrarGraficos() {
    this.graficos.forEach(grafico => grafico.destroy());
    this.graficos = [];
  }

  graficoPublicaciones() {
  this.estadisticasService
    .publicacionesPorUsuario(this.desde, this.hasta)
    .subscribe((data: any) => {

      console.log('PUBLICACIONES POR USUARIO:', data);

      const grafico = new Chart('grafico1', {
        type: 'bar',
        data: {
          labels: data.map((d: any) => d.usuario),
          datasets: [
            {
              label: 'Publicaciones',
              data: data.map((d: any) => d.cantidad),
            },
          ],
        },
      });

      this.graficos.push(grafico);
    });
  }

  graficoComentariosTotal() {
    this.estadisticasService
      .comentariosTotal(this.desde, this.hasta)
      .subscribe((data: any) => {
        const grafico = new Chart('grafico2', {
          type: 'pie',
          data: {
            labels: ['Comentarios'],
            datasets: [
              {
                data: [data[0]?.cantidad || 0],
              },
            ],
          },
        });

        this.graficos.push(grafico);
      });
  }

  graficoComentariosPorPublicacion() {
  this.estadisticasService
    .comentariosPorPublicacion(this.desde, this.hasta)
    .subscribe((data: any) => {

      console.log('COMENTARIOS POR PUBLICACION:', data);

      const grafico = new Chart('grafico3', {
        type: 'bar',
        data: {
          labels: data.map((d: any) => d.publicacion),
          datasets: [
            {
              label: 'Comentarios',
              data: data.map((d: any) => d.cantidad),
            },
          ],
        },
      });

      this.graficos.push(grafico);
    });
  }

  graficoLoginsPorUsuario() {
    this.estadisticasService
      .loginsPorUsuario(this.desde, this.hasta)
      .subscribe((data: any) => {
        const grafico = new Chart('grafico4', {
          type: 'bar',
          data: {
            labels: data.map((d: any) => d.usuario),
            datasets: [
              {
                label: 'Ingresos',
                data: data.map((d: any) => d.cantidad),
              },
            ],
          },
        });

        this.graficos.push(grafico);
      });
  }

  graficoVisitasPerfil() {
    this.estadisticasService
      .visitasPerfil(this.desde, this.hasta)
      .subscribe((data: any) => {
        const grafico = new Chart('grafico5', {
          type: 'doughnut',
          data: {
            labels: data.map((d: any) => d.usuario),
            datasets: [
              {
                label: 'Visitas',
                data: data.map((d: any) => d.cantidad),
              },
            ],
          },
        });

        this.graficos.push(grafico);
      });
  }

  graficoLikesPorDia() {
    this.estadisticasService
      .likesPorDia(this.desde, this.hasta)
      .subscribe((data: any) => {
        const grafico = new Chart('grafico6', {
          type: 'line',
          data: {
            labels: data.map((d: any) => d.dia),
            datasets: [
              {
                label: 'Me gusta por día',
                data: data.map((d: any) => d.cantidad),
              },
            ],
          },
        });

        this.graficos.push(grafico);
      });
  }
}
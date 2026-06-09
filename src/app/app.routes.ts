import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Publicaciones } from './pages/publicaciones/publicaciones';
import { MiPerfil } from './pages/mi-perfil/mi-perfil';
import { PublicacionDetalle } from './pages/publicacion-detalle/publicacion-detalle';
import { Cargando } from './pages/cargando/cargando';
import { DashboardUsuarios } from './pages/dashboard-usuarios/dashboard-usuarios';
import { DashboardEstadisticas } from './pages/dashboard-estadisticas/dashboard-estadisticas';
import { PerfilPublico } from './pages/perfil-publico/perfil-publico';
import { Guardados } from './pages/guardados/guardados';
import { Compartidos } from './pages/compartidos/compartidos';

export const routes: Routes = [
  { path: '', component: Cargando },
  { path: 'cargando', component: Cargando },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'publicaciones', component: Publicaciones },
  { path: 'mi-perfil', component: MiPerfil },
  { path: 'publicacion/:id', component: PublicacionDetalle },
  { path: 'dashboard-usuarios', component: DashboardUsuarios },
  { path: 'dashboard-estadisticas', component: DashboardEstadisticas },
  { path: 'perfil/:id', component: PerfilPublico },
  { path: 'guardados', component: Guardados },
  { path: 'compartidos', component: Compartidos },
];
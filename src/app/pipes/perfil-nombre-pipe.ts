import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'perfilNombre',
  standalone: true,
})
export class PerfilNombrePipe implements PipeTransform {
  transform(perfil: string): string {
    if (perfil === 'administrador') {
      return 'Administrador';
    }

    return 'Usuario';
  }
}
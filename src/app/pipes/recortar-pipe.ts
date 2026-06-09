import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recortar',
  standalone: true,
})
export class RecortarPipe implements PipeTransform {
  transform(texto: string, cantidad: number = 80): string {
    if (!texto) return '';

    if (texto.length <= cantidad) {
      return texto;
    }

    return texto.substring(0, cantidad) + '...';
  }
}
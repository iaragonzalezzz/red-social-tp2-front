import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltar]',
  standalone: true,
})
export class ResaltarDirective {
  constructor(private elemento: ElementRef) {}

  @HostListener('mouseenter')
  alEntrar() {
    this.elemento.nativeElement.style.transform = 'scale(1.02)';
    this.elemento.nativeElement.style.transition = '0.2s';
  }

  @HostListener('mouseleave')
  alSalir() {
    this.elemento.nativeElement.style.transform = 'scale(1)';
  }
}
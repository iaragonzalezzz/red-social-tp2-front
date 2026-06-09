import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSombra]',
  standalone: true,
})
export class SombraDirective {
  constructor(private elemento: ElementRef) {}

  @HostListener('mouseenter')
  ponerSombra() {
    this.elemento.nativeElement.style.boxShadow =
      '0 8px 25px rgba(168, 85, 247, 0.25)';
  }

  @HostListener('mouseleave')
  sacarSombra() {
    this.elemento.nativeElement.style.boxShadow =
      '0 4px 20px rgba(0, 0, 0, 0.04)';
  }
}
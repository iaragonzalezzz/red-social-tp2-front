import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appSoloAdmin]',
  standalone: true,
})
export class SoloAdminDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  @Input() set appSoloAdmin(usuario: any) {
    this.viewContainer.clear();

    if (usuario?.perfil === 'administrador') {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
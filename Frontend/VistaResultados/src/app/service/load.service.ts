import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  activateClass(element: HTMLElement, className: string) {
    this.renderer.addClass(element, className);
  }

  deactivateClass(element: HTMLElement, className: string) {
    this.renderer.removeClass(element, className);
  }
}

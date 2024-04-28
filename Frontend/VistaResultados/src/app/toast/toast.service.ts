import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  template: TemplateRef<any>;
  classname?: string;
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  success(toast: Toast) {
    this.toasts.push({ classname: 'bg-success text-light', ...toast });
  }
  error(toast: Toast) {
    this.toasts.push({ classname: 'bg-danger text-light', ...toast });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}

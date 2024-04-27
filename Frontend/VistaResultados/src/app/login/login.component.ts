import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../toast/toast.service';
import { ToastsContainer } from '../toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgbTooltipModule, ToastsContainer],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  toastService = inject(ToastService);

  showStandard(template: TemplateRef<any>) {
    this.toastService.show({ template });
  }

  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({
      template,
      classname: 'bg-success text-light',
    });
  }

  showDanger(template: TemplateRef<any>) {
    this.toastService.show({
      template,
      classname: 'bg-danger text-light',
    });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}

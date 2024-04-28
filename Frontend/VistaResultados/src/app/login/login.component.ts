import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Toast, ToastService } from '../toast/toast.service';
import { ToastsContainer } from '../toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgbTooltipModule, ToastsContainer],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  constructor(private readonly toastService: ToastService) {}

  toast: Toast;

  @ViewChild('successTpl') successTpl!: TemplateRef<any>;
  @ViewChild('errorTpl') errorTpl!: TemplateRef<any>;

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  mover() {
    this.toastService.success({
      template: this.successTpl,
    });
  }

  mover2() {
    this.toastService.error({
      template: this.errorTpl,
    });
  }
}

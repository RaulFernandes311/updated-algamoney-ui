import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: MessageService) {  }

  success(msg: string) {
    this.toast.add({key: 'br', severity: 'success', summary: 'Success Message', detail: msg});
  }

  info(msg: string) {
    this.toast.add({key: 'br', severity: 'info', summary: 'Info Message', detail: msg});
  }

  warn(msg: string) {
    this.toast.add({key: 'br', severity: 'warn', summary: 'Warn Message', detail: msg});
  }

  error(msg: string) {
    this.toast.add({key: 'br', severity: 'error', summary: 'Error Message', detail: msg});
  }

  custom(msg: string) {
    this.toast.add({key: 'custom', severity: 'info', summary: 'Custom Toast', detail: msg});
  }
}

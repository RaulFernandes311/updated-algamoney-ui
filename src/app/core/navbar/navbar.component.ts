import { ToastService } from './../../shared/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login']);
        this.toast.success('Você foi deslogado com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

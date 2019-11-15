import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { MoneyHttpInterceptor } from './money-http-interceptor';

import { LoginFormComponent } from './login-form/login-form.component';

import { SharedModule } from './../shared/shared.module';

import { SegurancaRoutingModule } from './seguranca-routing.module';

import { environment } from './../../environments/environment';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,

    InputTextModule,
    ButtonModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [environment.url],
        blacklistedRoutes: [`${environment.apiUrl}/oauth/token`]
      }
    }),

    SegurancaRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    }
  ]
})
export class SegurancaModule { }

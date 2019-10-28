import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { MessageService, ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { ToastService } from '../shared/toast.service';

import { NavbarComponent } from './navbar/navbar.component';
import { CategoriaService } from '../categorias/categoria.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,

    MessageService,
    ErrorHandlerService,

    ToastService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }

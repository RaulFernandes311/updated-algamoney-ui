import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,

    HttpClientModule,

    CoreModule,
    SegurancaModule,

    LancamentosModule,
    PessoasModule,

    AppRoutingModule
    // Obs: Este import deve ser importado somente após
    // os módulos que têm as rotas por módulo.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

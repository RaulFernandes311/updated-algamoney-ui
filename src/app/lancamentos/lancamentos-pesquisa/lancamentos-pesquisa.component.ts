import { Component, OnInit } from '@angular/core';

import { LancamentoService } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao: string;
  lancamentos = [];

  cols = [
    { field: 'pessoa', header: 'Pessoa' },
    { field: 'descricao', header: 'Descricao' },
    { field: 'dataVencimento', header: 'Vencimento' },
    { field: 'dataPagamento', header: 'Pagamento' },
    { field: 'valor', header: 'Valor' }
  ];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.lancamentoService.pesquisar({descricao: this.descricao})
      .then(lancamentos => {
        this.lancamentos = lancamentos;
      });
  }

  getHeaderColumnClasses(col: any) {
    if (col.header === 'Vencimento' || col.header === 'Pagamento') {
      return 'col-data-header';
    }
    if (col.header === 'Valor') {
      return 'col-valor-header';
    }
  }

}

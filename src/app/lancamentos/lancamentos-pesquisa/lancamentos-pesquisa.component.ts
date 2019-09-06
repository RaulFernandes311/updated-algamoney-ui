import { Component, OnInit } from '@angular/core';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;

  dataVencimentoInicioString: string;

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

    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    };

    this.lancamentoService.pesquisar(filtro)
      .then(lancamentos => {
        this.lancamentos = lancamentos;
      });
  }

  getHeaderColumnClasses(header: string) {
    if (header === 'Vencimento' || header === 'Pagamento') {
      return 'col-data-header';
    }
    if (header === 'Valor') {
      return 'col-valor-header';
    }
  }

  getBodyColumnClasses(header: string, tipo: string) {
    return header === 'Valor' ?
      tipo === 'DESPESA' ?
        ['redClass', 'col-valor-content'] : ['blueClass', 'col-valor-content'] :
      header === 'Vencimento' || header === 'Pagamento' ?
        'col-data-content' : null;
  }

}

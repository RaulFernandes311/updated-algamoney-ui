import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/api';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

import { Table } from 'primeng/table';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro();

  totalRegistros = 0;

  lancamentos = [];

  @ViewChild('tabela', {static: true}) grid: Table;

  cols = [
    { field: 'pessoa', header: 'Pessoa' },
    { field: 'descricao', header: 'Descricao' },
    { field: 'dataVencimento', header: 'Vencimento' },
    { field: 'dataPagamento', header: 'Pagamento' },
    { field: 'valor', header: 'Valor' }
  ];

  constructor(
    private lancamentoService: LancamentoService,
    private toast: MessageService
  ) { }

  ngOnInit() {  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset();

        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Lançamento excluído com sucesso'
        });

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

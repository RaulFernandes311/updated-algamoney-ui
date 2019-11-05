import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { ToastService } from './../../shared/toast.service';

import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

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
    private errorHandler: ErrorHandlerService,
    private toast: ToastService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluír este lançamento?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset();
        this.toast.success('Lançamento excluído com sucesso');
      })
      .catch(erro => this.errorHandler.handle(erro));
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

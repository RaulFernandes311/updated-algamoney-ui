import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Table } from 'primeng/table';

import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { ToastService } from './../../shared/toast.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  filtro = new PessoaFiltro();

  totalRegistros = 0;

  pessoas = [ ];

  @ViewChild('tabela', {static: true}) grid: Table;

  cols = [
    { field: 'nome', header: 'Nome' },
    { field: 'cidade', header: 'Cidade' },
    { field: 'estado', header: 'Estado' },
    { field: 'ativo', header: 'Status' }
  ];

  constructor(
    private pessoaService: PessoaService,
    private confirmation: ConfirmationService,
    private toast: ToastService,
    private errorHandler: ErrorHandlerService
    ) { }

  ngOnInit() {  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluír este lançamento?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.grid.reset();
        this.toast.success('Pessoa excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.alternarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toast.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}

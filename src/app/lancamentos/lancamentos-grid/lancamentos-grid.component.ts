import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos = [];

  cols = [
    { field: 'pessoa', header: 'Pessoa' },
    { field: 'descricao', header: 'Descricao' },
    { field: 'dataVencimento', header: 'Vencimento' },
    { field: 'dataPagamento', header: 'Pagamento' },
    { field: 'valor', header: 'Valor' }
  ];

  getHeaderColumnClasses(col: any) {
    if (col.header === 'Vencimento' || col.header === 'Pagamento') {
      return 'col-data-header';
    }
    if (col.header === 'Valor') {
      return 'col-valor-header';
    }
  }

}

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 4;
}

export class Pessoa {
  nome: string;
  cidade: string;
  estado: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.pessoasUrl}`, { headers })
      .toPromise()
      .then(response => response['content']);
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, params })
      .toPromise()
      .then(response => {
        return this.getPessoas(response);
        /*const pessoas = response['content'];

        const resultado = {
          pessoas,
          total: response['totalElements']
        };

        return resultado;*/
      });
  }

  getPessoas(response: any) {
    const pessoas = [ ];
    let pessoa: Pessoa;

    const content = response['content'];

    content.forEach(element => {
      pessoa = new Pessoa();

      pessoa.nome = element.nome;
      pessoa.cidade = element['endereco'].cidade;
      pessoa.estado = element['endereco'].estado;
      pessoa.ativo = element.ativo;

      pessoas.push(pessoa);

    });

    const resultado = {
      pessoas,
      total: response['totalElements']
    };

    return resultado;
  }
}

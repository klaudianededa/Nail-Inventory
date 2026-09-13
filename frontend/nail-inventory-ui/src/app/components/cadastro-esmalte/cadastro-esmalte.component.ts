import { Component } from '@angular/core';

import { Esmalte } from '../../models/esmalte';
import { EsmalteService } from '../../services/esmalte.service';

@Component({
  selector: 'app-cadastro-esmalte',
  templateUrl: './cadastro-esmalte.component.html',
  styleUrls: ['./cadastro-esmalte.component.scss']
})
export class CadastroEsmalteComponent {

  novoEsmalte: Esmalte = {
    id: 0,
    nome: '',
    marca: '',
    dataVencimento: null,
    observacoes: null,
    caminhoImagem: null
  };

  cadastrando = false;
  erroCadastro = '';

  constructor(private esmalteService: EsmalteService) { }

  cadastrarEsmalte(): void {
    this.cadastrando = true;
    this.erroCadastro = '';

    this.esmalteService.postEsmalte(this.novoEsmalte).subscribe({
      next: () => {
        this.cadastrando = false;

        this.novoEsmalte = {
          id: 0,
          nome: '',
          marca: '',
          dataVencimento: null,
          observacoes: null,
          caminhoImagem: null
        };
      },
      error: (erro) => {
        console.error('Erro ao cadastrar esmalte:', erro);
        this.erroCadastro = 'Não foi possível cadastrar o esmalte.';
        this.cadastrando = false;
      }
    });
  }
}
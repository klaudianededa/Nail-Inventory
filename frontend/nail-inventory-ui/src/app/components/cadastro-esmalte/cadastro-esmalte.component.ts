import { Component, OnInit } from '@angular/core';

import { Esmalte } from '../../models/esmalte';
import { EsmalteService } from '../../services/esmalte.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-esmalte',
  templateUrl: './cadastro-esmalte.component.html',
  styleUrls: ['./cadastro-esmalte.component.scss']
})
export class CadastroEsmalteComponent implements OnInit {

  novoEsmalte: Esmalte = {
    id: 0,
    nome: '',
    marca: '',
    dataVencimento: null,
    observacoes: null,
    caminhoImagem: null
  };

  cadastrando = false;
  editando = false;
  idEsmalte?: number;
  erroCadastro = '';

  constructor(
    private esmalteService: EsmalteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editando = true;
      this.idEsmalte = Number(id);
      this.carregarEsmalte(this.idEsmalte);
    }
  }

  salvarEsmalte(): void {
    this.cadastrando = true;
    this.erroCadastro = '';

    if (this.editando && this.idEsmalte) {
      this.esmalteService
        .updateEsmalte(this.idEsmalte, this.novoEsmalte)
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (erro) => {
            console.error('Erro ao atualizar esmalte:', erro);
            this.erroCadastro = 'Não foi possível atualizar o esmalte.';
            this.cadastrando = false;
          }
        });

      return;
    }

    this.esmalteService.postEsmalte(this.novoEsmalte).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (erro) => {
        console.error('Erro ao cadastrar esmalte:', erro);
        this.erroCadastro = 'Não foi possível cadastrar o esmalte.';
        this.cadastrando = false;
      }
    });
  }

  carregarEsmalte(id: number): void {
    this.esmalteService.getEsmalte(id).subscribe({
      next: (esmalte) => {
        this.novoEsmalte = esmalte;
      },
      error: (erro) => {
        console.error('Erro ao buscar esmalte:', erro);
      }
    });
  }
}
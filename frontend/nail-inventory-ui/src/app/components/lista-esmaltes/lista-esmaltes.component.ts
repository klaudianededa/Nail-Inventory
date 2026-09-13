import { Component, OnInit } from '@angular/core';

import { Esmalte } from '../../models/esmalte';

import { EsmalteService } from '../../services/esmalte.service';

@Component({
  selector: 'app-lista-esmaltes',
  templateUrl: './lista-esmaltes.component.html',
  styleUrls: ['./lista-esmaltes.component.scss']
})
export class ListaEsmaltesComponent implements OnInit {

  esmaltes: Esmalte[] = [];

  esmaltesFiltrados: Esmalte[] = [];

  marcas: string[] = [];

  marcaSelecionada = '';

  vencimentoAte = '';

  busca = '';

  filtroStatus = 'todos';

  carregando = false;

  erro = '';


  constructor(
    private esmalteService: EsmalteService
  ) { }


  ngOnInit(): void {
    this.carregarMarcas();
    this.carregarEsmaltes();
  }


  carregarMarcas(): void {
    this.esmalteService.getMarcas().subscribe({
      next: (marcas) => {
        this.marcas = marcas;
      },

      error: (erro) => {
        console.error('Erro ao buscar marcas:', erro);
      }
    });
  }


  carregarEsmaltes(): void {

    this.carregando = true;

    this.erro = '';

    this.esmalteService
      .getEsmaltes(
        this.marcaSelecionada || undefined,
        this.vencimentoAte || undefined
      )
      .subscribe({

        next: (esmaltes) => {

          this.esmaltes = esmaltes;

          this.aplicarFiltros();

          this.carregando = false;
        },

        error: (erro) => {

          console.error('Erro ao buscar esmaltes:', erro);

          this.erro = 'Não foi possível carregar os esmaltes.';

          this.carregando = false;
        }
      });
  }


  aplicarFiltros(): void {

    const buscaNormalizada = this.busca
      .trim()
      .toLowerCase();


    this.esmaltesFiltrados = this.esmaltes.filter((esmalte) => {

      const correspondeBusca =
        !buscaNormalizada ||
        esmalte.nome.toLowerCase().includes(buscaNormalizada) ||
        esmalte.marca.toLowerCase().includes(buscaNormalizada);


      const correspondeStatus =
        this.correspondeAoStatus(esmalte);


      return correspondeBusca && correspondeStatus;
    });
  }


  correspondeAoStatus(esmalte: Esmalte): boolean {

    if (this.filtroStatus === 'todos') {
      return true;
    }

    if (!esmalte.dataVencimento) {
      return false;
    }

    const dataVencimento = new Date(esmalte.dataVencimento);

    const hoje = new Date();


    if (this.filtroStatus === 'vencidos') {

      return dataVencimento < hoje;
    }


    if (this.filtroStatus === 'esteAno') {

      return dataVencimento.getFullYear() === hoje.getFullYear();
    }


    return true;
  }


  selecionarMarca(marca: string): void {

    if (this.marcaSelecionada === marca) {
      this.marcaSelecionada = '';
    } else {
      this.marcaSelecionada = marca;
    }

    this.filtroStatus = 'todos';

    this.carregarEsmaltes();
  }


  selecionarStatus(status: string): void {

    this.filtroStatus = status;

    this.aplicarFiltros();
  }


  aoBuscar(): void {
    this.aplicarFiltros();
  }


  limparFiltros(): void {

    this.marcaSelecionada = '';

    this.vencimentoAte = '';

    this.busca = '';

    this.filtroStatus = 'todos';

    this.carregarEsmaltes();
  }


  excluirEsmalte(id: number): void {

    const confirmar = confirm(
      'Tem certeza que deseja excluir este esmalte?'
    );


    if (!confirmar) {
      return;
    }


    this.esmalteService.deleteEsmalte(id).subscribe({

      next: () => {
        this.carregarEsmaltes();
      },

      error: (erro) => {

        console.error('Erro ao excluir esmalte:', erro);

        this.erro = 'Não foi possível excluir o esmalte.';
      }
    });
  }

  estaVencido(esmalte: Esmalte): boolean {
    if (!esmalte.dataVencimento) {
      return false;
    }

    return new Date(esmalte.dataVencimento) < new Date();
  }

  venceEmAteSeisMeses(esmalte: Esmalte): boolean {
    if (!esmalte.dataVencimento || this.estaVencido(esmalte)) {
      return false;
    }

    const hoje = new Date();
    const limite = new Date();

    limite.setMonth(limite.getMonth() + 6);

    const vencimento = new Date(esmalte.dataVencimento);

    return vencimento <= limite;
  }

  get quantidadeVencidos(): number {
    const hoje = new Date();

    return this.esmaltes.filter((esmalte) => {
      if (!esmalte.dataVencimento) {
        return false;
      }

      return new Date(esmalte.dataVencimento) < hoje;
    }).length;
  }
}
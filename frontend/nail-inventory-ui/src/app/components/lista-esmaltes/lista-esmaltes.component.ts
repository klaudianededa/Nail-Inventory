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

  ordemVencimento: 'asc' | 'desc' = 'asc';

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
          console.error('Erro ao carregar esmaltes:', erro);
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

    this.esmaltesFiltrados.sort((a, b) => {

      if (!a.dataVencimento && !b.dataVencimento) {
        return 0;
      }

      if (!a.dataVencimento) {
        return 1;
      }

      if (!b.dataVencimento) {
        return -1;
      }

      const dataA = new Date(a.dataVencimento).getTime();
      const dataB = new Date(b.dataVencimento).getTime();

      return this.ordemVencimento === 'asc'
        ? dataA - dataB
        : dataB - dataA;
    });
  }

  alternarOrdemVencimento(): void {
    this.ordemVencimento =
      this.ordemVencimento === 'asc'
        ? 'desc'
        : 'asc';

    this.aplicarFiltros();
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

    dataVencimento.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);

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

    const vencimento = new Date(esmalte.dataVencimento);
    const hoje = new Date();

    vencimento.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);

    return vencimento < hoje;
  }

  venceEmAteSeisMeses(esmalte: Esmalte): boolean {

    if (
      !esmalte.dataVencimento ||
      this.estaVencido(esmalte)
    ) {
      return false;
    }

    const hoje = new Date();
    const limite = new Date();

    limite.setMonth(limite.getMonth() + 6);

    const vencimento = new Date(esmalte.dataVencimento);

    hoje.setHours(0, 0, 0, 0);
    limite.setHours(23, 59, 59, 999);
    vencimento.setHours(0, 0, 0, 0);

    return vencimento <= limite;
  }

  get quantidadeVencidos(): number {

    return this.esmaltes.filter(
      (esmalte) => this.estaVencido(esmalte)
    ).length;
  }
}
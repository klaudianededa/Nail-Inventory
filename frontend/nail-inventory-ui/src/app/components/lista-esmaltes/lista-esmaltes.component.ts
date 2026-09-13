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
  marcas: string[] = [];

  marcaSelecionada = '';
  vencimentoAte = '';

  carregando = false;
  erro = '';

  constructor(private esmalteService: EsmalteService) { }

  ngOnInit(): void {
    this.carregarMarcas();
    this.carregarEsmaltes();
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
          this.carregando = false;
        },
        error: (erro) => {
          console.error('Erro ao buscar esmaltes:', erro);
          this.erro = 'Não foi possível carregar os esmaltes.';
          this.carregando = false;
        }
      });
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

  limparFiltros(): void {
    this.marcaSelecionada = '';
    this.vencimentoAte = '';
    this.carregarEsmaltes();
  }
}
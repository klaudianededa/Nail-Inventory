import { Component, OnInit } from '@angular/core';
import { Esmalte } from './models/esmalte';
import { EsmalteService } from './services/esmalte.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  esmaltes: Esmalte[] = [];

  marcaSelecionada = '';
  vencimentoAte = '';

  carregando = false;
  erro = '';

  constructor(private esmalteService: EsmalteService) { }

  ngOnInit(): void {
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

  limparFiltros(): void {
    this.marcaSelecionada = '';
    this.vencimentoAte = '';
    this.carregarEsmaltes();
  }
}
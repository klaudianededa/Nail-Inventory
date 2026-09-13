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

  constructor(private esmalteService: EsmalteService) { }

  ngOnInit(): void {
    this.esmalteService.getEsmaltes().subscribe({
      next: (esmaltes) => {
        this.esmaltes = esmaltes;
      },
      error: (erro) => {
        console.error('Erro ao buscar esmaltes:', erro);
      }
    });
  }
}
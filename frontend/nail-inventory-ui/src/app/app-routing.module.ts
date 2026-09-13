import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEsmaltesComponent } from './components/lista-esmaltes/lista-esmaltes.component';
import { CadastroEsmalteComponent } from './components/cadastro-esmalte/cadastro-esmalte.component';

const routes: Routes = [
  {
    path: '',
    component: ListaEsmaltesComponent
  },
  {
    path: 'esmaltes/novo',
    component: CadastroEsmalteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
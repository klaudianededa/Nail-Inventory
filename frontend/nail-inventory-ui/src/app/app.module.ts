import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ListaEsmaltesComponent } from './components/lista-esmaltes/lista-esmaltes.component';
import { CadastroEsmalteComponent } from './components/cadastro-esmalte/cadastro-esmalte.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaEsmaltesComponent,
    CadastroEsmalteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

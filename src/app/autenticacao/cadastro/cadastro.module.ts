import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';



import { CadastroComponent } from './components/cadastro.component';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';

import { CadastrarService } from './services/cadastro-.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule, IConfig } from 'ngx-mask'



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),


    
  ],
  declarations: [
  	CadastrarComponent,
  	CadastroComponent
  ],
  providers: [
    CadastrarService
  ]
})
export class CadastroModule { }
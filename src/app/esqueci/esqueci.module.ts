import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { UserService } from '@app/_services/user.service';
import { PerfilComponent } from '../perfil/perfil.component';



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
  	PerfilComponent,
  ],
  providers: [
    UserService
  ]
})
export class PerfilModule { }
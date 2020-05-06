import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';

import { Cadastro } from '../models/cadastro.model';
import { Observable } from 'rxjs/internal/Observable';
import { Compl } from '../models/compl.model';

@Injectable()
export class CadastrarService {

  private readonly PATH: string = 'users';

  constructor(private http: HttpClient) { }

  cadastrar(cadastro: Cadastro): Observable<any> {
      console.log(env.apiUrl  + this.PATH);
  	  return this.http.post(env.apiUrl + '/' + this.PATH, cadastro);
  }



}
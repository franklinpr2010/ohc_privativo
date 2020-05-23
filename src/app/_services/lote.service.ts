import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { AuthenticationService } from '.';
import { Lote } from '@app/_models/lote';



@Injectable({ providedIn: 'root' })

export class LoteService {
    private readonly PATH: string = '/lotes';

    constructor(private http: HttpClient, private authentication: AuthenticationService) {
     }
    buscarLotesPorCapitulo(capituloId)  {
      console.log('buscarLotesPorCapitulo');
      return this.http.get<Lote[]>(environment.apiUrl  + this.PATH  + '?' + 'capitulo=' + capituloId, this.authentication.headers());
    }
 }

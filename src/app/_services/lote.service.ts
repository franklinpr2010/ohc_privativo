import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { AuthenticationService } from '.';
import { Lote } from '@app/_models/lote';
import { Observable } from 'rxjs';




@Injectable({ providedIn: 'root' })

export class LoteService {
    private readonly PATH: string = '/lotes';

    constructor(private http: HttpClient, private authentication: AuthenticationService) {
     }
    buscarLotesPorCapitulo(capituloId)  {
      console.log('buscarLotesPorCapitulo');
      return this.http.get<Lote[]>(environment.apiUrl  + this.PATH  + '?' + 'capitulo=' + capituloId, this.authentication.headers());
    }

    buscarLote(id)  {
      console.log('buscarLote');
      return this.http.get<Lote>(environment.apiUrl  + this.PATH  + '?' + 'id=' + id, this.authentication.headers());
    }

 /**
  * Baixando arquivo
  */
 downloadFile(url: string) {
  return this.http.get<Blob>(url, { observe: 'response', responseType: 'blob' as 'json' })
}

 }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { AuthenticationService } from './authentication.service';
import { Post } from '@app/_models/post';


@Injectable({ providedIn: 'root' })
export class PostService {
    private readonly PATH: string = '/posts';
    constructor(private http: HttpClient, private authentication: AuthenticationService) {
     }

    getAll() {
        return this.http.get<Post[]>(
  	  	environment.apiUrl + this.PATH ,
  	  	this.authentication.headers()
  	);
    }

     /**
     * Buscar por capitulo
     */
    buscarPostPorCapitulo(capituloId)  {
        console.log('buscarLotesPorCapitulo');
        return this.http.get<Post[]>(environment.apiUrl  + this.PATH  + '?' + 'capitulo=' + capituloId, this.authentication.headers());
    }

    /**
     * Buscar por id
     */
    buscarPostPorId(id)  {
        return this.http.get<Post>(environment.apiUrl  + this.PATH  + '/' +  id, this.authentication.headers());
    }
}
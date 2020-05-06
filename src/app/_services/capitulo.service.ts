import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Capitulo } from '@app/_models/capitulo';
import { AuthenticationService } from './authentication.service';


@Injectable({ providedIn: 'root' })
export class CapituloService {
    private readonly PATH: string = '/capitulos';
    constructor(private http: HttpClient, private authentication: AuthenticationService) {
     }

    getAll() {
        return this.http.get<Capitulo[]>(
  	  	environment.apiUrl + this.PATH ,
  	  	this.authentication.headers()
  	);
    }
}
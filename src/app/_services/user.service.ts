import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { AuthenticationService } from '.';
import { Observable } from 'rxjs/internal/Observable';
import { Esqueci } from '@app/_models/esqueci';
import { Reset } from '@app/_models/reset';

@Injectable({ providedIn: 'root' })
export class UserService {
    esqueci: Esqueci;
    reset: Reset;
    constructor(private http: HttpClient, private authentication: AuthenticationService) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    buscarPorId(id: number): Observable<any> {
        console.log(this.authentication.headers().headers);
        return this.http.get(
            environment.apiUrl + '/users' + '/' + id,
            this.authentication.headers()
        );
    }

    atualizar(user: User): Observable<any> {
           console.log(user);
          return this.http.put(environment.apiUrl  + '/users/' + user.id, user);
    }

    recuperarSenha(email: string): Observable<any> {
        this.esqueci  = new Esqueci();
        this.esqueci.url =  environment.apiUrl + 'users-permissions/auth/reset-password';
        this.esqueci.email = email;
        console.log(environment.apiUrl + '/auth/forgot-password');
        return this.http.post(environment.apiUrl + '/auth/forgot-password',  this.esqueci);
     }

     reenviarSenha(code:string, password: string, newpassword: string): Observable<any> {
        this.reset  = new Reset();
        this.reset.code = code;
        this.reset.password = password;
        this.reset.passwordConfirmation = newpassword;
        return this.http.post(environment.apiUrl + '/auth/reset-password',  this.reset);
     }



}
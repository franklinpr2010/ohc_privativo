import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { CapituloService } from '@app/_services/capitulo.service';
import { Capitulo } from '@app/_models/capitulo';
import { environment } from '@environments/environment';
import { UsuarioCapitulo } from '@app/_models/usuariocapitulo';
import { Router } from '@angular/router';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    loading = false;
    capitulos: Capitulo[];
    capitulosUsuario: Capitulo[];
    environment: any;
    user: User;
    usuarioCapitulos: UsuarioCapitulo[];

    constructor(private userService: UserService,
        private authenticationService :  AuthenticationService,
        private capituloService: CapituloService,
        private router: Router) {
       
     }

    ngOnInit() {
        this.environment = environment.apiUrl;
        this.loading = true;
        this.user = this.authenticationService.currentUserValue;
        this.usuarioCapitulos = this.user.usuario_capitulos;
         this.capituloService.getAll().pipe(first()).subscribe(capitulos => {
            this.capitulos =  capitulos;
            this.capitulosUsuario = this.capitulos.filter(x => this.usuarioCapitulos.map(y => y.capitulo).includes(x.id));
            console.log(this.capitulosUsuario );
            console.log(this.capitulosUsuario );
        });

      
    
    }

    btnClick= function (id) {
        this.router.navigate(['/lote', id]);
    };
}
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { CapituloService } from '@app/_services/capitulo.service';
import { Capitulo } from '@app/_models/capitulo';
import { environment } from '@environments/environment';
import { UsuarioCapitulo } from '@app/_models/usuariocapitulo';
import { ActivatedRoute, Router } from '@angular/router';
import { Lote } from '@app/_models/lote';
import { LoteService } from '@app/_services/lote.service';

@Component({ templateUrl: 'lote.component.html' })
export class LoteComponent implements OnInit {
    loading = false;
    capitulos: Capitulo[];
    capitulosUsuario: Capitulo[];
    environment: any;
    user: User;
    usuarioCapitulos: UsuarioCapitulo[];
    id: number;
    private sub: any;
    lotes: Lote[];

    constructor(private userService: UserService,
        private authenticationService :  AuthenticationService,
        private loteService: LoteService,
        private route: ActivatedRoute,
        private router: Router) {
     }

    ngOnInit() {
        this.user = this.authenticationService.currentUserValue;
        this.environment = environment.apiUrl;
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
            console.log(this.id);
            this.buscarLotes(this.id);
         });
    }

    


    /**
     * Buscar lotes por capitulo
     */
    buscarLotes(capituloId) {
        
        this.loteService.buscarLotesPorCapitulo(capituloId).subscribe (
            data => {
                this.lotes = data;
                console.log(this.lotes);
            },
            err => {
            }
           );
    }
}
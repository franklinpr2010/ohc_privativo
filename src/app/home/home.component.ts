import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { CapituloService } from '@app/_services/capitulo.service';
import { Capitulo } from '@app/_models/capitulo';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    capitulos: Capitulo[];

    constructor(private userService: UserService,
        private authenticationService :  AuthenticationService,
        private capituloService: CapituloService) {
       
     }

    ngOnInit() {
        this.loading = true;
        console.log('teste')
         this.capituloService.getAll().pipe(first()).subscribe(capitulos => {
            this.capitulos =  capitulos;
            console.log(this.capitulos);
        });


     
    }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent  {
    currentUser: User;
 

    ngOnInit() {
        //this.router.navigate([''])
    }
   

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    perfil() {
        this.router.navigate(['/perfil'])
    }

    posts() {
        this.router.navigate(['/post'])
    }


    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    
}
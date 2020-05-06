import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CadastroComponent } from './autenticacao/cadastro/components/cadastro.component';
import { CadastroModule } from './autenticacao/cadastro/cadastro.module';
import { CadastroRoutingModule } from './autenticacao/cadastro/cadastro-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxMaskModule, IConfig } from 'ngx-mask'




@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        CadastroModule,
        //Modulo filho Routing de cadastro Pj sendo importado.
        CadastroRoutingModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot(),
        NgxMaskModule.forRoot(),
        appRoutingModule

    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
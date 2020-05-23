import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CadastroModule } from './autenticacao/cadastro/cadastro.module';
import { CadastroRoutingModule } from './autenticacao/cadastro/cadastro-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { PerfilModule } from './perfil/perfil.module';
import { LoteComponent } from './lote/lote.component';
import { LoteService } from './_services/lote.service';
import { RouterModule } from '@angular/router';
import { PostService } from './_services/post.service';
import { PostsComponent } from './post/posts.component';
import { PostComponent } from './post/post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MarkdownModule } from "ngx-markdown"; 
import { EsqueciComponent } from './esqueci/esqueci.component';
import { ResetComponent } from './reset/reset.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        CadastroModule,
        PerfilModule,
        //Modulo filho Routing de cadastro Pj sendo importado.
        CadastroRoutingModule,
        BrowserAnimationsModule,
        MarkdownModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        NgxMaskModule.forRoot(),
        CKEditorModule,
        appRoutingModule,
    ],
    exports: [ RouterModule ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoteComponent,
        LoginComponent,
        PostsComponent,
        PostComponent,
        ResetComponent,
    EsqueciComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        LoteService,
        PostService
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
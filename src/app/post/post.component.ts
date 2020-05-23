import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { CapituloService } from '@app/_services/capitulo.service';
import { Capitulo } from '@app/_models/capitulo';
import { environment } from '@environments/environment';
import { UsuarioCapitulo } from '@app/_models/usuariocapitulo';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '@app/_services/post.service';
import { Post } from '@app/_models/post';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({ templateUrl: 'post.component.html' })
export class PostComponent implements OnInit {
    loading = false;
    environment: any;
    user: User;
    usuarioCapitulos: UsuarioCapitulo[];
    capitulos: Capitulo[];
    capitulosUsuario: Capitulo[];
    private sub: any;
    id: number;
    post: Post;
    public Editor = ClassicEditor;


    constructor(private userService: UserService,
        private authenticationService :  AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private postService: PostService) {
       
     }

    ngOnInit() {
        this.user = this.authenticationService.currentUserValue;
        this.environment = environment.apiUrl;
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
            console.log(this.id);
            this.buscarPostPortId(this.id);
         });
    }

      /**
     * Buscar posts por capitulo
     */
    buscarPostPortId(id) {
           this.postService.buscarPostPorId(id).pipe(first()).subscribe(post => {
           this.post =  post;
           console.log(post);
        });
    }


}
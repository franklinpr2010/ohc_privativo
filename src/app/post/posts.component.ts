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

@Component({ templateUrl: 'posts.component.html' })
export class PostsComponent implements OnInit {
    loading = false;
    environment: any;
    user: User;
    usuarioCapitulos: UsuarioCapitulo[];
    capitulos: Capitulo[];
    capitulosUsuario: Capitulo[];
    private sub: any;
    id: number;
    posts: Post[];
    posts_niveis = new Array();


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
            this.buscarPosts(this.id);
         });
    }

    post() {

    }

      /**
     * Buscar posts por capitulo
     */
    buscarPosts(capituloId) {
           this.postService.getAll().pipe(first()).subscribe(posts => {
            posts.sort((a,b) => a.lote < b.lote ? -1 : 1); 
            posts.sort((a,b) => a.capitulo.id < b.capitulo.id ? -1 : 1);
            posts.forEach(element => {
            console.log(element.capitulo.id);
            if(this.user.nivel == 0) {
                this.posts_niveis.push(element);
            }else if(element.capitulo.id == this.user.nivel) {
                    if(element.lote <= this.user.lote ) {
                        this.posts_niveis.push(element);
                    }
                } else if (element.capitulo.id < this.user.nivel) {
                    this.posts_niveis.push(element);
                }
            });



           this.posts =  posts;
        });
    }

    btnClick= function (id) {
        this.router.navigate(['/post', id]);
    };
}
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { CadastroComponent } from './autenticacao/cadastro/components/cadastro.component';
import { LoteComponent } from './lote/lote.component';
import { PostsComponent } from './post/posts.component';
import { PostComponent } from './post/post.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EsqueciComponent } from './esqueci/esqueci.component';
import { ResetComponent } from './reset/reset.component';


const routes: Routes = [
    { path: 'lote/:id', component: LoteComponent, canActivate: [AuthGuard] },
    { path: 'reset/:code', component: ResetComponent },
    { path: 'esqueci', component: EsqueciComponent },
    { path: 'post/:id', component: PostComponent, canActivate: [AuthGuard] },
    { path: 'cadastro', component: CadastroComponent  },
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'homepage', component: HomeComponent, canActivate: [AuthGuard], },
    { path: 'post', component: PostsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'homepage', pathMatch: 'full' } ,
    
    // otherwise redirect to home
   { path: '**', redirectTo: 'homepage' },
];

export const appRoutingModule = RouterModule.forRoot(routes, {useHash: true});
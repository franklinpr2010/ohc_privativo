import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { CadastroComponent } from './autenticacao/cadastro/components/cadastro.component';

const routes: Routes = [
    { path: 'cadastro', component: CadastroComponent },

    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' },

   
];

export const appRoutingModule = RouterModule.forRoot(routes);
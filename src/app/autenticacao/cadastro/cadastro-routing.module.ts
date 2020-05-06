import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro.component';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';



export const CadastroRoutes: Routes = [
	{
		path: 'cadastro',
		component: CadastroComponent,
		children: [
		  {
			path: '', 
			component: CadastrarComponent 
		  }
		]
	}
];

@NgModule({
  imports: [
  	RouterModule.forChild(CadastroRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CadastroRoutingModule {
}
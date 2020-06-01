import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cadastro } from '../../models/cadastro.model';
import { CadastrarService } from '../../services/cadastro-.service';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { Compl } from '../../models/compl.model';
import { UsuarioCapitulo } from '@app/_models/usuariocapitulo';
import { UserService } from '@app/_services';
import { User } from '@app/_models';
import { Capitulo } from '@app/_models/capitulo';



@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  validatingForm: FormGroup;
  sucesso = true;
  message = '';

  constructor(
    private router: Router,
    private cadastrarService: CadastrarService, private userService: UserService,
) { 

}

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', [Validators.required, Validators.email]),
      signupFormModalPassword: new FormControl('', Validators.required),
      signupFormModalTelefone: new FormControl('', Validators.required),
      signupFormModalTexto: new FormControl('', Validators.required),
    });
  }

  get signupFormModalName() {
    return this.validatingForm.get('signupFormModalName');
  }

  get signupFormModalEmail() {
    return this.validatingForm.get('signupFormModalEmail');
  }

  get signupFormModalPassword() {
    return this.validatingForm.get('signupFormModalPassword');
  }

  get signupFormModalTelefone() {
    return this.validatingForm.get('signupFormModalTelefone');
  }

  get signupFormModalTexto() {
    return this.validatingForm.get('signupFormModalTexto');
  }

  onSubmit(form) {
    console.log(form.value)
  }

  get f(){
    return this.validatingForm.controls;
  }


 
  
  
   submit(){

    console.log(this.validatingForm.value);

  }


  cadastrar() {
 

    const cadastro: Cadastro = new Cadastro(null, this.signupFormModalName.value, this.signupFormModalEmail.value,
    this.signupFormModalPassword.value, this.signupFormModalTelefone.value,this.signupFormModalTexto.value);

    console.log(cadastro);
    this.cadastrarService.cadastrar(cadastro)
    //O subscribe retorna dois objetos, um no caso de sucesso e outro no caso de erro.
      .subscribe(
        data => {
          let cadastroCadastado: Cadastro = data;
          let user: User = new User(Number(cadastroCadastado.id), cadastro.username, null, null, false,
          cadastro.email, 1, cadastro.telefone, null, null, null, null, null, cadastro.texto, 1, null, false);
          console.log(user);
          let cap: Capitulo = new Capitulo();
          cap.id = 1

          let usuarioCap = new UsuarioCapitulo(null, user.username + '-Nível 1', user.id, cap.id);
          this.cadastrarNivel(usuarioCap, cadastroCadastado);
         
          //Enviar e-mail
          this.sucesso = true;
          this.message = 'Usuário Registrado com sucesso!';
          
         
        },
        err => {
          this.sucesso = false;
          let msg: string = "Tente novamente em instantes.";
         
          if (err.statusCode == 400) {
            msg = err.message.messages.join(' ');
           
          }
          console.log(err);
          console.log(err[0]);
          this.message = err[0].messages[0].message;
        }
      );
      return false;
  }


  cadastrarNivel(usuarioCapitulo: UsuarioCapitulo, cadastro: Cadastro) {
    this.cadastrarService.cadastrarNivel(usuarioCapitulo)
      .subscribe(
        data => {
          console.log('Nível cadastrado');
          console.log(data);

          let usuarioCaps: UsuarioCapitulo[] = [] ;
          let usuarioCapitulo: UsuarioCapitulo = data;
          console.log(data);
          usuarioCaps.push(usuarioCapitulo);

          let user: User = new User(Number(cadastro.id), cadastro.username, null, null, false,
          cadastro.email, 1, cadastro.telefone, null, null, null, null, null, cadastro.texto, 1, usuarioCaps, false);
          console.log(user);
          this.atualizarUsuario(user, cadastro);
         
        },
        err => {
          this.sucesso = false;
          let msg: string = "Tente novamente em instantes.";
          if (err.statusCode == 400) {
            msg = err.message.messages.join(' ');
          }
          this.message = err[0].messages[0].message;
        }
        );
      return false;
  } 


  atualizarUsuario(user: User, cadastro: Cadastro) {
    this.userService.atualizar(user)
      .subscribe(
        data => {
          console.log('Usuario atualizado');
          console.log(data);
          //Enviando e-mail
          this.cadastrarService.enviarEmail(cadastro);
        },
        err => {
          this.sucesso = false;
          let msg: string = "Tente novamente em instantes.";
          if (err.statusCode == 400) {
            msg = err.message.messages.join(' ');
          }

          console.log( err[0]);
          console.log( err);
          this.message = err[0].messages[0].message;
        }
        );
      return false;
  } 


  voltar() {
    this.router.navigate(['/login'])
  }


 

}



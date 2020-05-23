import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



import * as moment from 'moment';
import { AuthenticationService, UserService } from '@app/_services';
import { Observable } from 'rxjs';
import { User } from '@app/_models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var navigator: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public user: User;
  validatingForm: FormGroup;
  sucesso = true;
  message = '';
  fullName:string;
  capitulo:string;

  constructor(
    private router: Router, private authentication: AuthenticationService, private userService: UserService) { }

  ngOnInit() {

    this.validatingForm = new FormGroup({
      signupFormModalUserName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', [Validators.required, Validators.email]),
      signupFormModalTelefone: new FormControl('', Validators.required),
      signupFormModalPrimeiroNome: new FormControl('', Validators.required),
      signupFormModalUltimoNome: new FormControl('', Validators.required),
      signupFormModalNivel: new FormControl('', Validators.required),
      signupFormModalCidade: new FormControl('', Validators.required),
      signupFormModalEndereco: new FormControl('', Validators.required),
      signupFormModalCep: new FormControl('', Validators.required),
      signupFormModalPais: new FormControl('', Validators.required),
      signupFormModalObs: new FormControl('', Validators.required),

    });
      this.user = this.authentication.currentUserValue;
      console.log( this.user);
     this.userService.buscarPorId(this.user.id).subscribe (
      data => {
          this.user = data;
          console.log(this.user.username);
          this.signupFormModalUserName.setValue(this.user.username);
          this.signupFormModalEmail.setValue(this.user.email);
          this.signupFormModalNivel.setValue(this.user.nivel);
          this.signupFormModalTelefone.setValue(this.user.telefone);
          this.signupFormModalCep.setValue(this.user.cep);
          this.signupFormModalObs.setValue(this.user.texto);
          this.signupFormModalPais.setValue(this.user.pais);
          this.signupFormModalEndereco.setValue(this.user.endereco);
          this.signupFormModalCidade.setValue(this.user.cidade);
          this.signupFormModalPrimeiroNome.setValue(this.user.firstName);
          this.signupFormModalUltimoNome.setValue(this.user.lastName);
          this.fullName = this.user.firstName + ' ' + this.user.lastName;
          //console.log(this.signupFormModalUserName);
      },
      err => {
        
      }

     );

  }

  get f(){
    return this.validatingForm.controls;
  }

  get signupFormModalUserName() {
    return this.validatingForm.get('signupFormModalUserName');
  }

  get signupFormModalEmail() {
    return this.validatingForm.get('signupFormModalEmail');
  }

  get signupFormModalTelefone() {
    return this.validatingForm.get('signupFormModalTelefone');
  }

  get signupFormModalPrimeiroNome() {
    return this.validatingForm.get('signupFormModalPrimeiroNome');
  }

  get signupFormModalUltimoNome() {
    return this.validatingForm.get('signupFormModalUltimoNome');
  }

  get signupFormModalNivel() {
    return this.validatingForm.get('signupFormModalNivel');
  }
  get signupFormModalCidade() {
    return this.validatingForm.get('signupFormModalCidade');
  }

  get signupFormModalEndereco() {
    return this.validatingForm.get('signupFormModalEndereco');
  }

  get signupFormModalCep() {
    return this.validatingForm.get('signupFormModalCep');
  }

  get signupFormModalPais() {
    return this.validatingForm.get('signupFormModalPais');
  }

  get signupFormModalObs() {
    return this.validatingForm.get('signupFormModalObs');
  }

  atualizar() {



    this.user = new User(
      this.user.id, 
      this.signupFormModalUserName.value, 
      this.signupFormModalPrimeiroNome.value,
      this.signupFormModalUltimoNome.value, 
      false,
      this.signupFormModalEmail.value,
      this.signupFormModalNivel.value,
      this.signupFormModalTelefone.value,
      null,
      this.signupFormModalCep.value,
      this.signupFormModalCidade.value,
      this.signupFormModalPais.value,
      this.signupFormModalEndereco.value,
      this.signupFormModalObs.value

      );
      console.log(this.user);

    this.userService.atualizar(this.user)
    //O subscribe retorna dois objetos, um no caso de sucesso e outro no caso de erro.
      .subscribe(
        data => {
          console.log('perfil');
          console.log(this.user);
         
          this.sucesso = true;
          this.message = 'Usuário Atualizado com sucesso!';
         
        },
        err => {
          this.sucesso = false;
          let msg: string = "Tente novamente em instantes.";
          
          console.log(err);
          if (err.status == 400) {
            this.message = err.message.messages.join(' ');
           
          } else {
            this.message = err[0].messages[0].message;
          }
          
        }
      );
      return false;
  }

}

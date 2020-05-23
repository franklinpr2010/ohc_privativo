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
  selector: 'app-esqueci',
  templateUrl: './esqueci.component.html'
})
export class EsqueciComponent implements OnInit {

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
      signupFormModalEmail: new FormControl('', [Validators.required, Validators.email]),

    });
      this.user = this.authentication.currentUserValue;
      console.log( this.user);
   

      

  }

  get f(){
    return this.validatingForm.controls;
  }


  get signupFormModalEmail() {
    return this.validatingForm.get('signupFormModalEmail');
  }

 

  enviarEmail() {
      console.log( this.signupFormModalEmail.value);

    this.userService.recuperarSenha(this.signupFormModalEmail.value)
    //O subscribe retorna dois objetos, um no caso de sucesso e outro no caso de erro.
      .subscribe(
        data => {
          console.log('perfil');
          console.log(this.user);
         
          this.sucesso = true;
          this.message = 'Você receberá um e-mail!';
         
        },
        err => {
          this.sucesso = false;
          let msg: string = "Tente novamente em instantes.";
          
          console.log(err);
          if (err.status == 400) {
            this.message = err.message.messages.join(' ');
           
          } else {
            console.log(err);
            this.message = err.messages[0].message;
          }
          
        }
      );
      return false;
  }

}

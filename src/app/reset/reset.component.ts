import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';



import * as moment from 'moment';
import { AuthenticationService, UserService } from '@app/_services';
import { Observable } from 'rxjs';
import { User } from '@app/_models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '@environments/environment';

declare var navigator: any;

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html'
})
export class ResetComponent implements OnInit {

  public user: User;
  validatingForm: FormGroup;
  sucesso = true;
  message = '';
  fullName:string;
  capitulo:string;
  environment: any;
  private sub: any;
  code: string;

  constructor(
    private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {

    this.validatingForm = new FormGroup({
      signupFormModalPassword: new FormControl('', [Validators.required]),
      signupFormModalNewPassword: new FormControl('', [Validators.required]),

    });
      //this.user = this.authentication.currentUserValue;
      console.log( this.user);
   
       
      this.environment = environment.apiUrl;
      this.sub = this.route.params.subscribe(params => {
          this.code = params['code']; 
          console.log(this.code);
       });
      

  }

  get f(){
    return this.validatingForm.controls;
  }


  get signupFormModalPassword() {
    return this.validatingForm.get('signupFormModalPassword');
  }


  get signupFormModalNewPassword() {
    return this.validatingForm.get('signupFormModalNewPassword');
  }

 

  reenviarSenha() {
    console.log(this.code);
    console.log(this.signupFormModalNewPassword);
    console.log(this.signupFormModalPassword);

    this.userService.reenviarSenha(this.code, this.signupFormModalPassword.value, this.signupFormModalNewPassword.value)
    //O subscribe retorna dois objetos, um no caso de sucesso e outro no caso de erro.
      .subscribe(
        data => {
          console.log('perfil');
          console.log(this.user);
         
          this.sucesso = true;
          this.message = 'Senha alterada com sucesso!';
         
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

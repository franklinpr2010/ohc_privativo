import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cadastro } from '../../models/cadastro.model';
import { CadastrarService } from '../../services/cadastro-.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Compl } from '../../models/compl.model';



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
    private cadastrarService: CadastrarService,
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
          console.log(cadastro);
          const msg: string = "Realize o login para acessar o sistema.";
          this.sucesso = true;
          this.message = 'Usuário Registrado com sucesso!';
         
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



 

}
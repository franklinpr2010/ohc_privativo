import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import { Cadastro } from '@app/autenticacao/cadastro/models/cadastro.model';
import { CadastrarService } from '@app/autenticacao/cadastro/services/cadastro-.service';

@Component({ templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'] })
export class LoginComponent implements OnInit {
    validatingForm: FormGroup;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    sucesso = true;
    message = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private cadastrarService: CadastrarService,
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.validatingForm = new FormGroup({
            signupFormModalName: new FormControl('', Validators.required),
            signupFormModalEmail: new FormControl('', Validators.email),
            signupFormModalPassword: new FormControl('', Validators.required),
            signupFormModalTelefone: new FormControl('', Validators.required),
            signupFormModalTexto: new FormControl('', Validators.required),
          });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                    this.error = error[0].messages[0].message;;
                    this.loading = false;
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

      



}

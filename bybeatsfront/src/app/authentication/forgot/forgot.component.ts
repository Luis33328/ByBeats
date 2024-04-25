import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Autenticacao } from '../model/autenticacao.model';
import { AutenticacaoService } from '../service/autenticacao.service';
import { SignInService } from '../signIn/service/signIn.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'forgot.component.html',
    styleUrls: ['forgot.component.scss'],
})
export class ForgotComponent {

    
    public loading = false;
    public errorMessage = false;
    public successMessage = false;

    constructor(
      private router: Router, 
      private autenticacaoService: AutenticacaoService,
      private signInService: SignInService) { }

    public form: FormGroup = new FormGroup({});

    public ngOnInit() {
        this.initializeForms();
    }

    public initializeForms() {
        this.form = new FormGroup({
          email: new FormControl('')
    
        });
      }

    recuperar() {

        //console.log(this.login);
        this.loading = true;
        //await this.delay(1000);
        var email = this.form.get('email').value;
        console.log(email);

       this.signInService.getByEmail(email).subscribe(ret => {
        
        console.log(ret)
        this.loading = false;
        this.errorMessage = false;
        this.successMessage = true;

        //this.router.navigate(['']);
;      }, error => {
        console.log(error);
        this.loading = false;
        this.successMessage = false;
        this.errorMessage = true;
        this.error();
      });
    }

    error(){
        console.log("erro");
        return;
    }

}
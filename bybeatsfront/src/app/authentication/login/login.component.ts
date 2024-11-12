import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Autenticacao } from '../model/autenticacao.model';
import { AutenticacaoService } from '../service/autenticacao.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent {

    
    public loading = false;
    public errorMessage = false;

    constructor(private router: Router, private autenticacaoService: AutenticacaoService) { }

    public form: FormGroup = new FormGroup({});

    public ngOnInit() {
        this.initializeForms();
    }

    public initializeForms() {
        this.form = new FormGroup({
          login: new FormControl(''),
          senha: new FormControl('')
    
        });
      }

    logar() {

        //console.log(this.login);
        this.loading = true;
        //await this.delay(1000);
        let autenticacao = new Autenticacao();
        
        autenticacao.login = this.form.get('login').value;
        autenticacao.password = this.form.get('senha').value;
        console.log(autenticacao);

       this.autenticacaoService.login(autenticacao).subscribe(ret => {
        
        localStorage.setItem('currentToken',ret.access_token);
        this.loading = false;

        this.router.navigate(['']).then(() => {
          window.location.reload();
      });
;      }, error => {
        console.log(error);
        this.loading = false;
        this.errorMessage = true;
        this.error();
      });
    }

    error(){
        console.log("erro");
        return;
    }

}
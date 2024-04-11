import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autenticacao } from '../../model/autenticacao.model';
import { AutenticacaoService } from '../../service/autenticacao.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from '../service/signIn.service';
import { SignIn } from '../model/signIn.model';

@Component({
    templateUrl: 'signIn.component.html',
    styleUrls: ['signIn.component.scss'],
})
export class SignInComponent implements OnInit {

    public form: FormGroup = new FormGroup({});
    
    public loading = false;

    constructor(
      private router: Router, 
      private autenticacaoService: AutenticacaoService,
      private usuarioService: SignInService) { }

    public ngOnInit() {
        this.initializeForms();
    }

    public initializeForms() {
        this.form = new FormGroup({
          login: new FormControl(''),
          senha: new FormControl(''),
          email: new FormControl('')
    
        });
      }
    
      public save() {   
        if (this.form.valid) {
          let usuario = new SignIn();
          usuario.login = this.form.get('login').value;
          usuario.senha = this.form.get('senha').value;
          usuario.email = this.form.get('email').value;
    
          
          this.usuarioService.save(usuario).subscribe(
            (resp) => {
              console.log(resp);
              this.router.navigate(['/']);
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          console.log("Form Inválido");
        }
    }

}
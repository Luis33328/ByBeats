import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autenticacao } from '../../model/autenticacao.model';
import { AutenticacaoService } from '../../service/autenticacao.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from '../service/signIn.service';
import { SignIn } from '../model/signIn.model';
import { MatSnackBar } from '@angular/material';

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
      private snackBar: MatSnackBar,
      private usuarioService: SignInService) { }

      public ngOnInit() {
        this.initializeForms();
    }
    
    public initializeForms() {
      this.form = new FormGroup({
        login: new FormControl('', [Validators.required, Validators.minLength(3)]),
        senha: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/)
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmSenha: new FormControl('', [Validators.required, Validators.minLength(8)]),
      }, { validators: this.passwordsMatch });
  }
  
  public save() {   
      if (this.form.valid) {
        let usuario = new SignIn();
        usuario.login = this.form.get('login').value;
        usuario.senha = this.form.get('senha').value;
        usuario.email = this.form.get('email').value;
        this.usuarioService.getByLogin(usuario.login).subscribe(
          (resp) => {
            console.log(resp);
            this.snackBar.open('Usuário já cadastrado.', 'Fechar');
          },
          (err) => {
            console.log(err);
            this.usuarioService.save(usuario).subscribe(
              (resp) => {
                console.log(resp);
                this.snackBar.open('Usuário cadastrado com sucesso.', 'Fechar');
                this.router.navigate(['/']);
              },
              (err) => {
                console.log(err);
              }
            );
          }
        );
          
      } else {
        console.log("Form Inválido");
        this.snackBar.open('Preencha os campos corretamente.', 'Fechar');
      }
  }
  
  public passwordsMatch(group: FormGroup) {
    const senha = group.get('senha').value;
    const confirmSenha = group.get('confirmSenha').value;
  
    return senha === confirmSenha ? null : { notSame: true };
  }
}
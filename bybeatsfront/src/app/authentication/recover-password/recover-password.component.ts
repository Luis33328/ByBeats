import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecoverPasswordService } from './service/recover-password.service';
import { SignInService } from '../signIn/service/signIn.service';
import { SignIn } from '../signIn/model/signIn.model';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  email: any;
  public loading = false;
  public errorMessage = false;
  public successMessage = false;
  form: FormGroup; 

  public notSame = false;

  constructor(
    private recoverService: RecoverPasswordService,
    private signInService: SignInService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.recoverService.getEmail().subscribe(email => {
      this.email = email;
    });

    this.form = new FormGroup({
      email: new FormControl(this.email),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/)
      ]), 
      confirmSenha: new FormControl('', [Validators.required, Validators.minLength(8) ]),
    }, { validators: this.passwordsMatch });
  }
  
  /*atualizarSenha(){
    if (this.form.valid) {
      const senha = this.form.get('senha').value;
      const confirmPassword = this.form.get('confirmSenha').value;
  
      if (senha !== confirmPassword) {
        console.log('Senhas não conferem');
        return;
      }
  
      this.signInService.getByEmail(this.email).subscribe(ret => {
        const updateData = { ...ret, senha }; 
        this.recoverService.update(updateData).subscribe(ret => {
          console.log(ret);
        });
        this.loading = false;
        this.errorMessage = false;
        this.successMessage = true;
        this.router.navigate(['/login']); 
      });
    } else {
      console.log('Formulário inválido')
    }
  }*/

    atualizarSenha(){
      if (this.form.valid) {
        this.signInService.getByEmail(this.email).subscribe(ret => {

          let user = new SignIn();
          user.guidUsuario = Number.parseInt(ret.guidUsuario);
          user.nome = ret.nome;
          user.sobrenome = ret.sobrenome;
          user.login = ret.login;
          user.cpf = ret.cpf;
          user.sobre = ret.sobre;
          user.senha = this.form.get('senha').value;
          user.email = ret.email;
          user.role = ret.role;
    
          user.imagem = ret.imagem;
          user.otp = ret.otp
    
            

          this.recoverService.update(user).subscribe(ret => {
            console.log(ret);
          });
          this.loading = false;
          this.errorMessage = false;
          this.successMessage = true;
          this.router.navigate(['/login']); 
        });
      }
      else {
        console.log("Form Inválido");
        this.snackBar.open('Preencha os campos adequadamente.', 'Fechar');
      }
    }  

    /*public passwordsMatch(group: FormGroup) {
      const senha = group.get('senha').value;
      const confirmSenha = group.get('confirmSenha').value;
    
      return senha === confirmSenha ? null : { notSame: true };
    }*/

      public passwordsMatch(group: FormGroup) {
      const senha = group.get('senha').value;
      const confirmSenha = group.get('confirmSenha').value;
    
      return senha === confirmSenha ? null : { notSame: true };
    }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecoverPasswordService } from './service/recover-password.service';
import { SignInService } from '../signIn/service/signIn.service';

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

  constructor(
    private recoverService: RecoverPasswordService,
    private signInService: SignInService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recoverService.getEmail().subscribe(email => {
      this.email = email;
    });

    this.form = new FormGroup({
      email: new FormControl(this.email),
      senha: new FormControl('', Validators.required), 
      confirmSenha: new FormControl('', Validators.required) 
    });
  }
  
  atualizarSenha(){
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
  }
}
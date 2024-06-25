import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Autenticacao } from '../../model/autenticacao.model';
import { AutenticacaoService } from '../../service/autenticacao.service';
import { SignInService } from '../../signIn/service/signIn.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { send } from 'process';
import { ForgotService } from '../service/forgot.service';
import { MatDialog } from '@angular/material/dialog';
import { RecoverPasswordService } from '../../recover-password/service/recover-password.service';
import { Validator } from '@angular/forms';

@Component({
    templateUrl: 'forgot.component.html',
    styleUrls: ['forgot.component.scss'],
})
export class ForgotComponent {

    public loading = false;
    public errorMessage = false;
    public successMessage = false;
    private OTP: number | undefined;
    public email: any;

    constructor(
      private router: Router, 
      private autenticacaoService: AutenticacaoService,
      private signInService: SignInService,
      private ForgotService: ForgotService,
      private recoverPasswordService: RecoverPasswordService) { }

    public form: FormGroup = new FormGroup({});

    public ngOnInit() {
        this.initializeForms();
    }

    public initializeForms() {
        this.form = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          codigoOTP: new FormControl(''),
        });
    }

    enviarEmail() {
      var email = this.form.get('email').value;
      console.log(email)
      this.recoverPasswordService.setEmail(email); 
      this.signInService.getByEmail(email).subscribe(ret => {
        this.loading = false;
        this.errorMessage = false;
        this.successMessage = true;
  
        this.ForgotService.sendOTP(ret).subscribe(ret => {
          this.OTP = ret.otp;
          console.log(this.OTP)
        });
  
      }, error => {
        console.log(error);
        this.loading = false;
        this.successMessage = false;
        this.errorMessage = true;
        this.error();
      });
  }

    recuperarSenha() {
      this.loading = true;
      var email = this.form.get('email').value;
      var codigoOTP = this.form.get('codigoOTP').value; 
    
      if (this.OTP && this.OTP.toString() === codigoOTP.toString()) { 
          this.router.navigate(['/recover-password']);
          this.loading = false;
          this.successMessage = true;
          this.errorMessage = false;
          console.log('Codigo OTP correto');
      } else {
          this.loading = false;
          this.successMessage = false;
          this.errorMessage = true;
          console.log('Codigo OTP incorreto');
      }
    }

    error(){
        console.log("erro");
        return;
    }
}
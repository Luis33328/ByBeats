import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Autenticacao } from '../../model/autenticacao.model';
import { AutenticacaoService } from '../../service/autenticacao.service';
import { SignInService } from '../../signIn/service/signIn.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { send } from 'process';
import { ForgotService } from '../service/forgot.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
    templateUrl: 'forgot.component.html',
    styleUrls: ['forgot.component.scss'],
})
export class ForgotComponent {

    public loading = false;
    public errorMessage = false;
    public successMessage = false;
    private OTP: number;

    constructor(
      private router: Router, 
      private autenticacaoService: AutenticacaoService,
      private signInService: SignInService,
      private ForgotService: ForgotService,
      public dialog: MatDialog) { }

    public form: FormGroup = new FormGroup({});

    public ngOnInit() {
        this.initializeForms();
    }

    public initializeForms() {
        this.form = new FormGroup({
          email: new FormControl(''),
          codigoOTP: new FormControl(''),
        });
    }

    enviarEmail() {
        this.loading = true;
        var email = this.form.get('email').value;

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
      var codigoOTP = this.form.get('codigoOTP').value; // Get the codigoOTP from the form

      if (this.OTP.toString() === codigoOTP.toString()) { 
          this.dialog.open(DialogComponent); 
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
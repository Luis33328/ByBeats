import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form: FormGroup; // define the form group

  constructor(
    private recoverService: RecoverPasswordService,
    private signInService: SignInService
  ) { }

  ngOnInit() {
    this.recoverService.getEmail().subscribe(email => {
      this.email = email;
    });

    // initialize the form group
    this.form = new FormGroup({
      email: new FormControl(this.email),
      senha: new FormControl('', Validators.required), // add this line
      confirmSenha: new FormControl('', Validators.required) // add this line
    });
  }
  
  atualizarSenha(){
    this.signInService.getByEmail(this.email).subscribe(ret => {
      this.recoverService.update(ret).subscribe(ret => {
        console.log(ret);
      });
      this.loading = false;
      this.errorMessage = false;
      this.successMessage = true;
    });
  }
}
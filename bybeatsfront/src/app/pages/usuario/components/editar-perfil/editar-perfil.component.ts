import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import {NgxTinySliderSettingsInterface, NgxTinySliderComponent} from 'ngx-tiny-slider';
import { SignInService } from '../../../../authentication/signIn/service/signIn.service';
import { Beat } from '../../../beats/model/beat.model';
import { BeatService } from '../../../beats/service/beat.service';
import { SignIn } from 'src/app/authentication/signIn/model/signIn.model';
import { NavbarComponent } from 'src/app/navigation/navbar/navbar.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  public role = "";

  image: File = null;

  user:SignIn;

  public guidUsuario = '';

  public form: FormGroup = new FormGroup({});


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private usuarioService: SignInService,
    private beatService: BeatService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {

    this.getUserRole();
    this.get();
    this.initializeForms();
    
    //this.getLogged();
  }

  public get() {

    this.getLogged();
    
  }

  public fillForms(user: SignIn) {

    /*if(user.imagem != null){
      let img    = <HTMLInputElement>document.getElementById('profImage');  
      img.src = '../../../../../assets/uploads/' + user.imagem;
    }*/


    this.form.patchValue({
      nome: user.nome,
      sobrenome: user.sobrenome,
      usuario: user.login,
      cpf: user.cpf,
      sobre: user.sobre,
      dataNasc: this.datePipe.transform(user.dataNasc, 'dd/MM/yyy')
    });
  }


  public initializeForms() {
    this.form = new FormGroup({
      nome: new FormControl(''),
      sobrenome: new FormControl(''),
      dataNasc: new FormControl(''),
      usuario: new FormControl(''),
      cpf: new FormControl(''),
      sobre: new FormControl(''),
      dataNasc: new FormControl('')

    }, {validators: EditarPerfilComponent.isValidCpf});
}

static isValidCpf(): ValidatorFn {
  return (control: AbstractControl): Validators => {
    const cpf = control.value;
    if (cpf) {
      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      if (cpf.length < 11) {
       return null;
      }

      for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
          equalDigits = 0;
          break;
        }
      }

      if (!equalDigits) {
        numbers = cpf.substring(0, 9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--) {
          sum += numbers.charAt(10 - i) * i;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(0))) {
          return { cpfNotValid: true };
        }
        numbers = cpf.substring(0, 10);
        sum = 0;

        for (i = 11; i > 1; i--) {
          sum += numbers.charAt(11 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(1))) {
          return { cpfNotValid: true };
        }
        return null;
      } else {
        return { cpfNotValid: true };
      }
   }
 return null;
};
}


  private getLogged() {
    this.usuarioService.getByUsername().subscribe(data => {
      this.user = data;
      this.fillForms(data);
      this.guidUsuario = data.guidUsuario;
      console.log(this.guidUsuario)
      console.log(this.user)

    }, err => {
      console.log("eero");
    });
  }

  

  getImage(event){
    this.image = <File>event.target.files[0];
  }


  private getUserRole() {
    this.usuarioService.getByUsername().subscribe(data => {
      console.log(data.role);
      this.role = data.role;
    }, err => {
      console.log("Role error.");
    });
  }


  



  //mds que crime essas funcoes nao sei usar angular


  public changeImg(event){
    let img    = <HTMLInputElement>document.getElementById('profImage');
    let fileImg    = (<HTMLInputElement>document.getElementById('profImg')).files[0];  

    img.src = URL.createObjectURL(fileImg);

    this.image = event.target.files[event.target.files.length - 1] as File;
    console.log(this.image);
    console.log(this.image.name);
    //label.style.backgroundColor = "#911e1a";
  }

  public onUpload(){
    const fd = new FormData();

    fd.append('files', this.image, this.image.name);

    
      this.beatService.uploadImage(fd).subscribe(
        res => {
        console.log(res);
      });
  }

  

  public save() {   
    if (this.form.valid) {
        if(this.image != null){
          this.onUpload()
        }

          

        let user = new SignIn();
        user.guidUsuario = Number.parseInt(this.guidUsuario);
        user.nome = this.form.get('nome').value;
        user.sobrenome = this.form.get('sobrenome').value;
        user.dataNasc = this.form.get('dataNasc').value;
        user.login = this.form.get('usuario').value;
        user.cpf = this.form.get('cpf').value;
        user.sobre = this.form.get('sobre').value;

        user.dataNasc = this.form.get('dataNasc').value;

        user.senha = this.user.senha;
        user.email = this.user.email;

        user.role = this.user.role;
  
        user.otp = this.user.otp

        user.imagem = this.image === null ? this.user.imagem : this.image.name;

        this.usuarioService.getByCPF(user.cpf).subscribe(
          (resp) => {
            console.log(resp);
            if(resp.guidUsuario != user.guidUsuario){
              this.snackBar.open('CPF já cadastrado.', 'Fechar');
            }
            else{
              this.usuarioService.edit(user).subscribe(
                (resp) => {
                  console.log(resp);
                  this.snackBar.open('Informações atualizadas com sucesso', 'Fechar');
                  this.router.navigate(['/user/profile']);
                },
                (err) => {
                  console.log(err);
                  this.snackBar.open('Erro ao atualizar suas informações', 'Fechar');
                }
              );
            }
          },
          (err) => {
            console.log(err);
            this.usuarioService.edit(user).subscribe(
              (resp) => {
                console.log(resp);
                this.snackBar.open('Informações atualizadas com sucesso', 'Fechar');
                this.router.navigate(['/user/profile']);
              },
              (err) => {
                console.log(err);
                this.snackBar.open('Erro ao atualizar suas informações', 'Fechar');
              }
            );
          }
        );

        
        
      
    } 
    else {
      console.log("Form Inválido");
    }
  }

  public cancel(){
    this.router.navigate(['/user/profile']);
  }

}

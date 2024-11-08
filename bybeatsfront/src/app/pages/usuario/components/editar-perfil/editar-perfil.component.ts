import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInService } from '../../../../authentication/signIn/service/signIn.service';
import { SignIn } from 'src/app/authentication/signIn/model/signIn.model';
import { DatePipe } from '@angular/common';
import { S3Service } from 'src/app/s3.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  role = "";
  image: File = null;
  user: SignIn;
  guidUsuario = '';
  form: FormGroup = new FormGroup({});
  imageUrl: string;


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private usuarioService: SignInService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private s3Service: S3Service
  ) { }

  ngOnInit() {
    this.getUserRole();
    this.get();
    this.initializeForms();
  }

  get() {
    this.getLogged();
  }

  fillForms(user: SignIn) {
    this.form.patchValue({
      nome: user.nome,
      sobrenome: user.sobrenome,
      usuario: user.login,
      cpf: user.cpf,
      sobre: user.sobre,
      dataNasc: this.datePipe.transform(user.dataNasc, 'yyyy-MM-dd')
    });
  }

  initializeForms() {
    this.form = new FormGroup({
      nome: new FormControl(''),
      sobrenome: new FormControl(''),
      dataNasc: new FormControl(''),
      usuario: new FormControl(''),
      cpf: new FormControl(''),
      sobre: new FormControl('')
    }, { validators: EditarPerfilComponent.isValidCpf });
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

  getLogged() {
    this.usuarioService.getByUsername().subscribe(data => {
      this.user = data;
      this.fillForms(data);
      this.guidUsuario = data.guidUsuario;
    });
  }


  getImage(event: any) {
    this.image = event.target.files[0] as File;
  }


  getUserRole() {
    this.usuarioService.getByUsername().subscribe(data => {
      this.role = data.role;
    });
  }

  changeImg(event: any) {
    const img = document.getElementById('profImage') as HTMLInputElement;
    const fileImg = (document.getElementById('profImg') as HTMLInputElement).files[0];

    if (fileImg) { // Check if a file is selected.
      img.src = URL.createObjectURL(fileImg);
    }

    this.image = event.target.files[event.target.files.length - 1] as File;
  }



  onUpload() {
    if (!this.image) {
      return;
    }

    const bucketName = 'by-beats';
    const key = `imgs/${this.image.name}`;

    this.s3Service.uploadFile(this.image, bucketName, key)
      .pipe(
        finalize(() => {
          this.imageUrl = this.s3Service.getFileUrl(bucketName, key);
          console.log("imageUrl:", this.imageUrl); 
          this.saveUserData();
        })
      )
      .subscribe(
        res => {
          console.log('Upload successful:', res);
        },
        err => {
          console.error('Upload failed:', err);
          this.snackBar.open('Error uploading image. Please try again.', 'Fechar', { duration: 5000 });
        }
      );
  }

  private saveUserData() {
    const user = new SignIn();
    user.guidUsuario = Number.parseInt(this.guidUsuario);
    user.nome = this.form.get('nome').value;
    user.sobrenome = this.form.get('sobrenome').value;
    user.dataNasc = this.form.get('dataNasc').value;
    user.login = this.form.get('usuario').value;
    user.cpf = this.form.get('cpf').value;
    user.sobre = this.form.get('sobre').value;
    user.senha = this.user.senha;
    user.email = this.user.email;
    user.role = this.user.role;
    user.otp = this.user.otp;
    user.imagem = this.imageUrl || this.user.imagem;
    console.log("user.imagem:", user.imagem);



    this.usuarioService.getByCPF(user.cpf).subscribe(
      resp => {
        if (resp.guidUsuario != user.guidUsuario) {
          this.snackBar.open('CPF já cadastrado.', 'Fechar');
        } else {
          this.editUser(user);
        }
      },
      err => {
        this.editUser(user);
      }
    );
  }


  private editUser(user: SignIn) {
    this.usuarioService.edit(user).subscribe(
      resp => {
        this.snackBar.open('Informações atualizadas com sucesso', 'Fechar');
        this.router.navigate(['/user/profile']);
      },
      err => {
        this.snackBar.open('Erro ao atualizar suas informações', 'Fechar');
      }
    );
  }




  save() {
    if (this.form.valid && this.user) {
      if (this.image) {
        this.onUpload();
      } else {
        this.saveUserData();
      }
    } else {
      if (!this.user) {
        this.snackBar.open('User data not loaded yet. Please wait.', 'Fechar');
      } else {
        console.log("Form Inválido");
      }
    }
  }


  cancel() {
    this.router.navigate(['/user/profile']);
  }
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import { Usuario } from '../../model/usuario.model';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public guidUsuario: string = '';

  public perfis = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
  }


}

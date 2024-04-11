import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PAutorizada } from '../../model/autorizados.model';
import { PAutorizadaService } from '../../service/autorizados.service';
import { ConverterUtils } from 'src/app/common/converter.utils';


@Component({
  selector: 'app-cadastrar-PA',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarPAutorizadaComponent implements OnInit {


  public form: FormGroup = new FormGroup({});
  public isEstrangeiro: String = 'Nao';
  public tipoCliente: String = 'PESSOA_FISICA';
  public tipoInscricao: String = 'CONTRIBUINTE';
  public guidPA: string = '';

  public mask = "";

  constructor(
    private router: Router,
    private pAutorizadaService: PAutorizadaService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.initializeForms();
    this.get();
  }

  public get() {
    this.activeRoute.paramMap.subscribe(param => {
      this.guidPA = param.get('id');
    });
    if (this.guidPA !== 'novo') {
      this.pAutorizadaService.buscarPorId(this.guidPA).subscribe(data => {
        this.fillForms(data);
      });
    }
  }

  public fillForms(pa: PAutorizada) {
    this.form.patchValue({
      nome: pa.nome,
      motorista: pa.motorista,
      cpf: pa.cpf,
      dataVencimento: ConverterUtils.convertDateBackendToFrontend(pa.dataVencimento),
      cnh: pa.cnh,
      inativo: pa.inativo,

    });
  }

  

  public initializeForms() {
    this.form = new FormGroup({
      motorista: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      cnh: new FormControl('', [Validators.required]),
      dataVencimento: new FormControl('', [Validators.required]),
      inativo: new FormControl('', [Validators.required]),

    });
  }

  public changeMask(){
    if(this.form.get('cpf').value.length > 14){
      this.mask = "00.000.000/0000-00";
    }
    else{
      this.mask = "000.000.000-000";
    }
  }

  public changeEstrangeiro() {
    this.isEstrangeiro = this.form.get('estrangeiro').value;
    this.selectedEstrangeiroFieldValidator();
  }

  public changeTipoCliente() {
    this.tipoCliente = this.form.get('tipoCliente').value;
  }

  private selectedEstrangeiroFieldValidator() {
    if (this.isEstrangeiro === 'Sim') {
      this.form.get('nome').clearValidators();
      this.form.get('nome').updateValueAndValidity();
      this.form.get('documento').setValidators([Validators.required]);
      this.form.get('documento').updateValueAndValidity();
    } else {
      this.resetDefaultCPFValidator();
    }
  }

  private resetDefaultCPFValidator() {
    this.form.get('documento').clearValidators();
    this.form.get('documento').updateValueAndValidity();
    this.form.get('nome').setValidators([Validators.required]);
    this.form.get('nome').updateValueAndValidity();
  }

  public salvar() {
    console.log(this.form.get('nome').value);
    if (this.form.valid) {
      let PA = new PAutorizada();
      PA.guidPA = this.guidPA === 'novo' ? null : Number.parseInt(this.guidPA);
      PA.nome = this.form.get('nome').value;
      PA.motorista = this.form.get('motorista').value;
      PA.cpf = this.form.get('cpf').value;
      PA.cnh = this.form.get('cnh').value;
      PA.dataVencimento = ConverterUtils.convertDateFrontendToBackend(this.form.get('dataVencimento').value);
      
      PA.inativo = this.form.get('inativo').value;
      this.pAutorizadaService.save(PA).subscribe(
        (resp) => {
          console.log(this.form.get('cpf').value);
          console.log(resp);
          this.router.navigate(['/PA/pesquisar']);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.snackBar.open('Campos obrigatórios preenchidos de forma incorreta!', 'Fechar');
    }
  }

  public cancelar() {
    this.router.navigate(['/PA/pesquisar']);
  }
}

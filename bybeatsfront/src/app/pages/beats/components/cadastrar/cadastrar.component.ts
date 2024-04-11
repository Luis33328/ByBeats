import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import {NgxTinySliderSettingsInterface, NgxTinySliderComponent} from 'ngx-tiny-slider';
import { SignInService } from '../../../../authentication/signIn/service/signIn.service';
import { Beat } from '../../model/beat.model';
import { BeatService } from '../../service/beat.service';

@Component({
  selector: 'app-cadastrar-beat',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarBeatComponent implements OnInit {

  public role = "";

  wavUntagged: File = null;
  stems: File = null;
  wavTagged: File = null;
  image: File = null;

  public form: FormGroup = new FormGroup({});


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private usuarioService: SignInService,
    private beatService: BeatService,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {

    this.getUserRole();
    this.initializeForms()
  }

  public initializeForms() {
    this.form = new FormGroup({
      titulo: new FormControl(''),
      tags: new FormControl(''),
      dataLancamento: new FormControl(''),
      precoBasic: new FormControl(''),
      precoPremium: new FormControl(''),
      precoUnlimited: new FormControl(''),
      bpm: new FormControl(''),
      nota: new FormControl('')

    });
}
  
  getWavUntagged(event){
    this.wavUntagged = <File>event.target.files[0];
  }

  getStems(event){
    this.stems = <File>event.target.files[0];
  }

  getWavTagged(event){
    this.wavTagged = <File>event.target.files[0];
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

  public changeUntag(event){
    let input    = <HTMLInputElement>document.getElementById('untagged');
    let fileName = document.getElementById('file-name2');
    let label    = <HTMLInputElement>document.getElementById('lblUntagged');

    fileName.textContent = input.value.replace("C:\\fakepath\\", "");

    this.wavUntagged = event.target.files[event.target.files.length - 1] as File;
    
    //label.style.backgroundColor = "#911e1a";
  }

  public changeStems(event){
    let input    = <HTMLInputElement>document.getElementById('stems');
    let fileName = document.getElementById('file-name3');
    let label    = <HTMLInputElement>document.getElementById('lblStems');

    fileName.textContent = input.value.replace("C:\\fakepath\\", "");
    //label.style.backgroundColor = "#911e1a";

    this.stems = event.target.files[event.target.files.length - 1] as File;
  }

  public changeTagged(event){
    let input    = <HTMLInputElement>document.getElementById('tagged');
    let fileName = document.getElementById('file-name4');
    let label    = <HTMLInputElement>document.getElementById('lblTagged');

    fileName.textContent = input.value.replace("C:\\fakepath\\", "");

    this.wavTagged = event.target.files[event.target.files.length - 1] as File;
    //label.style.backgroundColor = "#911e1a";
  }

  public changeImg(event){
    let img    = <HTMLInputElement>document.getElementById('beatImage');
    let fileImg    = (<HTMLInputElement>document.getElementById('beatImg')).files[0];  

    img.src = URL.createObjectURL(fileImg);

    this.image = event.target.files[event.target.files.length - 1] as File;
    console.log(this.image);
    console.log(this.image.name);
    //label.style.backgroundColor = "#911e1a";
  }

  public onUpload(){
    const fd = new FormData();

    fd.append('files', this.wavUntagged, this.wavUntagged.name);
    fd.append('files', this.stems, this.stems.name);
    fd.append('files', this.wavTagged, this.wavTagged.name);
    fd.append('files', this.image, this.image.name);

    
      this.beatService.uploadImage(fd).subscribe(
        res => {
        console.log(res);
      });
  }

  public save() {   
    if (this.form.valid) {
      if(this.wavUntagged != null && this.stems != null && this.wavTagged != null && this.image != null){
        this.onUpload()

        let beat = new Beat();
        beat.titulo = this.form.get('titulo').value;
        //beat.tags = this.form.get('tags').value;
        beat.dataLancamento = this.form.get('dataLancamento').value;
        beat.wavUntagged = this.wavUntagged.name;
        beat.stems = this.stems.name;
        beat.wavTagged = this.wavTagged.name;
        beat.imagem = this.image.name;
        beat.precoBasic = this.form.get('precoBasic').value;
        beat.precoPremium = this.form.get('precoPremium').value;
        beat.precoUnlimited = this.form.get('precoUnlimited').value;
        beat.bpm = this.form.get('bpm').value;
        beat.nota = this.form.get('nota').value;
        
        this.beatService.save(beat).subscribe(
          (resp) => {
            console.log(resp);
            this.router.navigate(['/']);
          },
          (err) => {
            console.log(err);
          }
        );
      }
      else{
        console.log("Arquivos Necessários!");
      }
    } 
    else {
      console.log("Form Inválido");
    }
  }

  public cancel(){
    this.router.navigate(['/']);
  }

}

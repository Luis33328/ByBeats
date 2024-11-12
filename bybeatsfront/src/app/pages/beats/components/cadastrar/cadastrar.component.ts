import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import {NgxTinySliderSettingsInterface, NgxTinySliderComponent} from 'ngx-tiny-slider';
import { SignInService } from '../../../../authentication/signIn/service/signIn.service';
import { Beat } from '../../model/beat.model';
import { BeatService } from '../../service/beat.service';
import { SignIn } from 'src/app/authentication/signIn/model/signIn.model';
import { NavbarComponent } from 'src/app/navigation/navbar/navbar.component';
import { S3Service } from 'src/app/common/s3.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
  imageUrl: string;
  imgName = "";

  user:SignIn;

  public guidBeat = '';

  public form: FormGroup = new FormGroup({});

  public mask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
  };

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private usuarioService: SignInService,
    private beatService: BeatService,
    private snackBar: MatSnackBar,
    private s3Service: S3Service) { }

  public ngOnInit() {
    this.getUserRole();
    this.initializeForms()
    this.get();
    //this.getLogged();
  }

  public get() {
    this.activeRoute.paramMap.subscribe(param => {
      this.guidBeat = param.get('id');
    });
    if (this.guidBeat !== 'novo') {
      this.beatService.get(this.guidBeat).subscribe(data => {
        this.fillForms(data);
      });
    }
    this.getLogged();
  }

  public fillForms(beat: Beat) {
    let img = <HTMLInputElement>document.getElementById('beatImage');  
    img.src = beat.imagem;

    let untagged = document.getElementById('file-name2');
    ////untagged.textContent = beat.wavUntagged;
    //this.wavUntagged = fetch('../../../../../assets/uploads/' + beat.wavUntagged); 
    //console.log(this.wavUntagged.name);

    //let stems = document.getElementById('file-name3');
    ////stems.textContent = beat.stems;
    //this.stems = fetch('../../../../../assets/uploads/' + beat.stems); 

    //let tagged = document.getElementById('file-name4');
    ////tagged.textContent = beat.wavTagged;
    //this.wavTagged = fetch('../../../../../assets/uploads/' + beat.wavTagged); 

    this.form.patchValue({
      titulo: beat.titulo,
      dataLancamento: ConverterUtils.convertDateBackendToFrontend(beat.dataLancamento),
      precoBasic: beat.precoBasic,
      precoPremium: beat.precoPremium,
      precoUnlimited: beat.precoUnlimited,
      //discount: beat.discount,
      bpm: beat.bpm,
      nota: beat.nota,
    });
  }


  public initializeForms() {
    this.form = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      tags: new FormControl(''),
      dataLancamento: new FormControl('', [Validators.required]),
      precoBasic: new FormControl('', [Validators.required]),
      precoPremium: new FormControl('', [Validators.required]),
      precoUnlimited: new FormControl('', [Validators.required]),
      //discount: new FormControl(''),
      bpm: new FormControl('', [Validators.required]),
      nota: new FormControl('', [Validators.required]),

    });
}

  private getLogged() {
    this.usuarioService.getByUsername().subscribe(data => {
      this.user = data;
      console.log(this.user)

    }, err => {
      console.log("erro");
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
    });
  }


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

public changeImg(event) {
  let img = <HTMLInputElement>document.getElementById('beatImage');
  let fileImg = (<HTMLInputElement>document.getElementById('beatImg')).files[0];

  img.src = URL.createObjectURL(fileImg);

  this.image = event.target.files[event.target.files.length - 1] as File;
  console.log(this.image);
  console.log(this.image.name);
  this.imgName = this.image.name;

  if (this.image) {
    const bucketName = 'by-beats';
    const key = `imgs/${this.image.name}`;

    this.s3Service.uploadFile(this.image, bucketName, key)
      .pipe(
        finalize(() => {
          this.imageUrl = this.s3Service.getFileUrl(bucketName, key);
          console.log("imageUrl:", this.imageUrl);
        })
      )
      .subscribe(
        res => {
          console.log('Image upload successful:', res);
        },
        err => {
          console.error('Image upload failed:', err);
          this.snackBar.open('Error uploading image. Please try again.', 'Close', { duration: 5000 });
        }
      );
  }
}

  public onUpload() {
    if (!this.wavUntagged || !this.stems || !this.wavTagged || !this.image) {
      this.snackBar.open('All files must be selected before uploading.', 'Close', { duration: 5000 });
      return;
    }
  
    const bucketName = 'by-beats';
    const keyUntagged = `files/${this.wavUntagged.name}`;
    const keyStems = `files/${this.stems.name}`;
    const keyTagged = `files/${this.wavTagged.name}`;
    const keyImage = `imgs/${this.image.name}`;
  
    const uploadTasks = [
      this.s3Service.uploadFile(this.wavUntagged, bucketName, keyUntagged),
      this.s3Service.uploadFile(this.stems, bucketName, keyStems),
      this.s3Service.uploadFile(this.wavTagged, bucketName, keyTagged),
      this.s3Service.uploadFile(this.image, bucketName, keyImage)
    ];
  
    forkJoin(uploadTasks)
      .pipe(
        finalize(() => {
          this.imageUrl = this.s3Service.getFileUrl(bucketName, keyImage);
          console.log("imageUrl:", this.image);
          this.save();
        })
      )
      .subscribe(
        res => {
          console.log('Upload successful:', res);
          this.snackBar.open('Files uploaded successfully.', 'Close', { duration: 5000 });
        },
        err => {
          console.error('Upload failed:', err);
          this.snackBar.open('Error uploading files. Please try again.', 'Close', { duration: 5000 });
        }
      );
  }

  


  public save() {   

    var regexp;

    var untagged = document.getElementById('file-name2').textContent;
    var stems = document.getElementById('file-name3').textContent;
    var tagged = document.getElementById('file-name4').textContent;

    var extensionUntagged = untagged.substr(untagged.lastIndexOf('.'));
    var extensionStems = stems.substr(stems.lastIndexOf('.'));
    var extensionTagged = tagged.substr(tagged.lastIndexOf('.'));
    //var extensionImg = this.imgName.substr(this.imgName.lastIndexOf('.'));

    if (this.form.valid) {
      if(this.wavUntagged != null && this.stems != null && this.wavTagged != null && this.image != null || this.guidBeat != 'novo'){

        if ((extensionUntagged.toLowerCase() == ".wav") && (extensionStems.toLowerCase() == ".rar") && (extensionTagged.toLowerCase() == ".wav")){

          if(this.guidBeat == 'novo'){
            this.onUpload()
          }
            
          let beat = new Beat();
          beat.titulo = this.form.get('titulo').value;
          //beat.tags = this.form.get('tags').value;
          beat.dataLancamento = this.form.get('dataLancamento').value;
          if(this.guidBeat == 'novo'){
            beat.wavUntagged = this.wavUntagged.name;
            beat.stems = this.stems.name;
            beat.wavTagged = this.wavTagged.name;
            beat.imagem = this.imageUrl;
          }
          else{
            beat.wavUntagged = this.wavUntagged.name;
            beat.stems = this.stems.name;
            beat.wavTagged = this.wavTagged.name;
            beat.imagem = this.imageUrl;
          
          }
          
          beat.precoBasic = this.form.get('precoBasic').value;
          beat.precoPremium = this.form.get('precoPremium').value;
          beat.precoUnlimited = this.form.get('precoUnlimited').value;
          //beat.discount = this.form.get('discount').value;
          beat.bpm = this.form.get('bpm').value;
          beat.nota = this.form.get('nota').value;
          beat.usuario = this.user;
          
          this.beatService.save(beat).subscribe(
            (resp) => {
              console.log(resp);
              this.snackBar.open('Instrumental cadastrado com sucesso.', 'Fechar');
              this.router.navigate(['/']);
            },
            (err) => {
              console.log(err);
              this.snackBar.open('Erro ao cadastrar instrumental.', 'Fechar');
            }
          );
        }
        else{
          console.log("Formato de arquivo inválido.");
          this.snackBar.open('Formato de arquivo inválido.', 'Fechar');
        }
      }
      else{
        console.log("Arquivos Necessários!");
        this.snackBar.open('Faça upload dos arquivos necessários.', 'Fechar')
        
      }
    } 
    else {
      console.log("Form Inválido");
      this.snackBar.open('Preencha os campos corretamente.', 'Fechar');
    }
  }

  public cancel(){
    this.router.navigate(['/']);
  }

}

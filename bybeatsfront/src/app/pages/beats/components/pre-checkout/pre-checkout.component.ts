import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import {NgxTinySliderSettingsInterface, NgxTinySliderComponent} from 'ngx-tiny-slider';
import { BeatService } from '../../service/beat.service';
import { SignIn } from 'src/app/authentication/signIn/model/signIn.model';
import { SignInService } from '../../../../authentication/signIn/service/signIn.service';
import { Beat } from '../../model/beat.model';
import { Compra } from '../../model/Compra.model';
import { Pedido } from '../../model/Pedido.model';

@Component({
  selector: 'app-pre-checkout',
  templateUrl: './pre-checkout.component.html',
  styleUrls: ['./pre-checkout.component.scss']
})
export class PreCheckoutComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public beats = [];

  public cartBeats = [];

  pedidoModel:Pedido;

  compras: Compra[] = [];
  

  //public 

  userModel:SignIn;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private beatService: BeatService,
    private usuarioService: SignInService,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.getLogged()
    
    
  }

  public checkout(){

    

    let pedido = new Pedido();

    pedido.usuario = this.userModel;
    pedido.total = this.getTotal().toString();

    this.beatService.savePedido(pedido).subscribe(
      data => {
        console.log(data);

        this.pedidoModel = data;
        console.log(this.pedidoModel);
        
        for (let i = 0; i < this.cartBeats.length; i++) {
      
          let compra = new Compra();
          compra.usuario = this.userModel;
          compra.beat = this.cartBeats[i].beat;
          compra.licenca = this.cartBeats[i].precoBeat;
          compra.pedido = this.pedidoModel;
          this.compras.push(compra);
        }
        console.log(this.compras);

        this.beatService.saveCompra(this.compras).subscribe(
          data => {
            console.log(data);
            /*this.beatService.deleteCarrinhoCompra(this.userModel).subscribe(
              data => {
                console.log(data);
                
        
              }, err => {
                console.log(err);
              }
            );*/
  
          }, err => {
            console.log(err);
          }
        );

      }, err => {
        console.log(err);
      }
    );
      
  }

  public getFavoritos(){
    this.beatService.getFavoritos(this.userModel).subscribe(
      data =>{
        console.log(data);
        this.beats = data
      },
      err =>{
        console.log(err);
      }
    );
  }

  public getCarrinho(){
    this.beatService.getCarrinho(this.userModel).subscribe(
      data =>{
        console.log(data);
        this.cartBeats = data
      },
      err =>{
        console.log(err);
      }
    );
  }

  public deleteCarrinho(guidCarrinho){
    //console.log(guidBeat)


    this.beatService.deleteCarrinho(guidCarrinho).subscribe(
      data => {
        //alert("adicionou");
        this.getCarrinho();
        
      }, err => {
        console.log(err);
      }
    );
  }


  public getTotal(){
    let sum = 0;
    this.cartBeats.forEach(value => {
        sum += (Number(value.precoBeat));
    });
    return sum;
  }

  private getLogged() {
    this.usuarioService.getByUsername().subscribe(data => {
      this.userModel = data;
      console.log(this.userModel)
      this.getCarrinho()

    }, err => {
    });
  }

  public view(event) {
    this.router.navigate(['/beat/' + event]);
  }


  public getId(row) {
    console.log(row);
    this.view(row.guidBeat);
  }


  public edit(event) {
    this.router.navigate(['/beats/register/' + event]);
  }


  

}

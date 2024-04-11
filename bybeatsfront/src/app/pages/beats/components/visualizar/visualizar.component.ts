import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import {NgxTinySliderSettingsInterface, NgxTinySliderComponent} from 'ngx-tiny-slider';
import { BeatService } from '../../service/beat.service';

import { ProductOrder } from '../../model/productOrder.model';
import { ProductOrders } from '../../model/productOrders.model';
import { Beat } from '../../model/beat.model';
import { OrderService } from '../../service/order.service';
import { SignInService } from 'src/app/authentication/signIn/service/signIn.service';
import { Usuario } from 'src/app/pages/usuario/model/usuario.model';
import { SignIn } from 'src/app/authentication/signIn/model/signIn.model';
import { Carrinho } from '../../model/Carrinho.model';
import { NavbarComponent } from 'src/app/navigation/navbar/navbar.component';

@Component({
  selector: 'app-visualizar-beat',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarBeatComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public beat = [];

  public beatModel:Beat;

  public licenses = [];

  public guidBeat: string = '';

  public license = [];

  public border = 0;

  public userLogged:SignIn;

  public precoBeat = "";


  public onCart = false;



  productOrders: ProductOrder[] = [];
  beats: Beat[] = [];
  selectedProductOrder: Beat;
  private shoppingCartOrders: ProductOrders;
  //sub: Subscription;
  productSelected: boolean = false;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private beatService: BeatService,
    private usuarioService: SignInService,
    private orderService: OrderService,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.getParam();
    
    this.getLogged();
  }


  public getParam() {
    this.activeRoute.paramMap.subscribe(param => {
      this.guidBeat = param.get('id');
    });
  }

  private getBeat(){
    this.beatService.get(this.guidBeat).subscribe(data => {
      this.beat = data;
      this.licenses.push(data.precoBasic);
      this.licenses.push(data.precoPremium);
      this.licenses.push(data.precoUnlimited);

      this.license = this.licenses[0];
      this.beatModel = data
      console.log(this.guidBeat);
      this.getBeatPrice(this.guidBeat);
      
    });
  }

  private selectLicense(num){
    if(num < 10){
      this.license = this.licenses[num];
      this.border = num;
    }
    else{
      this.onCart = true
      this.license = this.licenses[this.licenses.indexOf(this.precoBeat.toString())];
      this.border = this.licenses.indexOf(this.precoBeat.toString());
      console.log(this.license)
    }
    //this.beatModel.price = this.license[num]
  // console.log(this.license.toString())
  }


  /*public addToCart(beat:Beat) {
    this.orderService.SelectedProductOrder = beat;
    this.selectedProductOrder = this.orderService.SelectedProductOrder;
    this.productSelected = true;
    console.log(this.selectedProductOrder)
  }

  private removeFromCart(productOrder: ProductOrder) {
      let index = this.getProductIndex(productOrder.beat);
      if (index > -1) {
          this.shoppingCartOrders.beats.splice(
              this.getProductIndex(productOrder.beat), 1);
      }
      this.orderService.ProductOrders = this.shoppingCartOrders;
      this.shoppingCartOrders = this.orderService.ProductOrders;
      this.productSelected = false;
  }


  private getProductIndex(beat: Beat): number {
    return this.orderService.ProductOrders.beats.findIndex(
        value => value === beat);
  }*/

  private getLogged() {
    this.usuarioService.getByUsername().subscribe(data => {
      this.userLogged = data
      console.log(data);
      this.getBeat();
      

    }, err => {
      console.log("eero");
    });

  }

  public addToCart(guidBeat){
    //console.log(guidBeat)
    let cart = new Carrinho();
    cart.usuario = this.userLogged;
    cart.precoBeat = this.license.toString();

    this.beatService.addAoCarrinho(guidBeat, cart).subscribe(
      data => {
        //alert("adicionou");
        location.reload();
        console.log(data);
      }, err => {
        console.log(err);
      }
    );
  }

  public getBeatPrice(guidBeat){
    //console.log(guidBeat)
    let cart = new Carrinho();
    cart.usuario = this.userLogged;
    cart.precoBeat = this.license.toString();

    this.beatService.getBeatPrice(guidBeat, cart).subscribe(
      data => {
        //alert("adicionou");
        console.log(data);
        this.precoBeat = data;
        console.log(this.precoBeat);
        this.selectLicense(11);
      }, err => {
        console.log(err);
      }
    );
  }




}

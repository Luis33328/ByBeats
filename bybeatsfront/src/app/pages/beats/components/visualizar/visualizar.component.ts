import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
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
import { Favorito } from '../../model/Favorito.model';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/common/shared.service';
import { PlayerComponent } from 'src/app/player/player.component';

@Component({
  selector: 'app-visualizar-beat',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarBeatComponent implements OnInit {

  /*@Output() onPlusClick = new EventEmitter<boolean>();

  plusClick() {
    
    this.onPlusClick.emit(true);
    console.log("true");
  }*/
  

  

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

  public onFavorites = false;

  public favorites = []

  public likes = 0;

  public role = '';

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
    private sharedService: SharedService,
    private snackBar: MatSnackBar) {

  }

  public ngOnInit() {
    this.getParam();
    
    this.getLogged();
    
  }

  public setTrue(){
    this.sharedService.showPlayer = true;
  }

  public showPlayer(){
    this.sharedService.beat = this.beatModel;
    if(this.sharedService.showPlayer == true ){
      this.sharedService.showPlayer = false;

      //setTimeout(this.setTrue, 1.0 * 1000);
      //this.sharedService.change = true;
      console.log(this.sharedService.showPlayer);
    }
    else{
      this.sharedService.showPlayer = true;
    }
    
    
    console.log(this.beatModel);

  }

  public getParam() {
    this.activeRoute.paramMap.subscribe(param => {
      this.guidBeat = param.get('id');
    });
  }

  public deleteBeat(guidBeat){
    //console.log(guidBeat)


    this.beatService.deleteBeat(guidBeat).subscribe(
      data => {

        console.log(data);
        this.router.navigate(["/"])
        
      }, err => {
        console.log(err);
      }
    );
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
      //this.sharedService.beat = this.beatModel;
      
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
      this.role = data.role;
      this.getBeat();
      this.getFavorite();
      this.getLikes();
      

    }, err => {
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

  public getFavorite(){
    let favorite = new Favorito();
    favorite.usuario = this.userLogged;
    this.beatService.checkFavorito(this.guidBeat, favorite).subscribe(
      data =>{
        console.log(data);
        if(data != null){
          this.onFavorites = true;
        }
      },
      err =>{
        console.log(err);
      }
    );
  }

  public getLikes(){
    this.beatService.getLikes(this.guidBeat).subscribe(
      data =>{
        console.log(data);
        if(data != null){
          this.likes = data.length;
          console.log('likes: ',this.likes);
          
        }
      },
      err =>{
        console.log(err);
      }
    );
  }

  public addToFavorites(guidBeat){
    let favorite = new Favorito();
    favorite.usuario = this.userLogged;
  
    this.beatService.addAosFavoritos(guidBeat, favorite).subscribe(
      data => {
        console.log(data);
        // Update the onFavorites property to reflect the change
        this.onFavorites = true;
        this.likes++;
      }, err => {
        console.log(err);
      }
    );
  }
  
  public deleteFavorite(guidBeat){
    let favorite = new Favorito();
    favorite.usuario = this.userLogged;
  
    this.beatService.deleteFavorito(guidBeat, favorite).subscribe(
      data => {
        console.log(data);
        // Update the onFavorites property to reflect the change
        this.onFavorites = false;
        this.likes--;
      }, err => {
        console.log(err);
      }
    );
  }

  public changeFavorite(){
    if(this.onFavorites == false){
      this.addToFavorites(this.guidBeat);
    }
    else{
      this.deleteFavorite(this.guidBeat);
    }
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

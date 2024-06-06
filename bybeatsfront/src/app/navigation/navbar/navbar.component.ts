import { AfterContentInit, AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { ConverterUtils } from 'src/app/common/converter.utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInService } from '../../authentication/signIn/service/signIn.service';
import { OrderService } from '../../pages/beats/service/order.service';
import { ProductOrder } from '../../pages/beats/model/productOrder.model';
import { ProductOrders } from '../../pages/beats/model/productOrders.model';
import { Beat } from '../../pages/beats/model/beat.model';
import { BeatService } from 'src/app/pages/beats/service/beat.service';
import { Usuario } from 'src/app/pages/usuario/model/usuario.model';
import { SignIn } from 'src/app/authentication/signIn/model/signIn.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {


  @Output() public sidebarToggle = new EventEmitter();

  public search: FormGroup = new FormGroup({});

  public role = "";
  public user = "";
  public userModel:SignIn;

  public cartBeats = [];



  productOrders: Beat[] = [];
  beats: Beat[] = [];
  selectedProductOrder: Beat;
  productSelected: boolean = false;

  orderFinished: boolean;
  orders: ProductOrders;
  total: String;
  sub: Subscription;

  @Output() onOrderFinished: EventEmitter<boolean>;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private usuarioService: SignInService,
    private beatService: BeatService,
    private orderService: OrderService,)
     {
        this.total = '';
        this.orderFinished = false;
        this.onOrderFinished = new EventEmitter<boolean>();
     }

  public ngOnInit() {
    this.initializeForms();
    this.getUserRole();

    if(this.role != null){
      this.getLogged();
      //console.log(this.userModel)
      
    }


    this.productOrders = [];

    this.orders = new ProductOrders();
    this.loadCart();
    this.loadTotal();

    console.log(this.orderService.ProductOrders)

  }



  public initializeForms() {
    this.search = new FormGroup({
      searchInput: new FormControl('')
    });
  }

  public onToggleSidebar = () => {
    this.sidebarToggle.emit();
  }

  private getUserRole() {
    this.usuarioService.getByUsername().subscribe(data => {
      console.log(data.role);
      this.role = data.role;
      localStorage.setItem('role',data.role);
    }, err => {
      console.log("Role error.");
    });
  }

  public cadastrar(event) {
    this.router.navigate(['/beats/register/' + event]);
  }

  public disconnect(){
    localStorage.clear();
    this.router.navigate(['/'])
    .then(() => {
      window.location.reload();
    });
  }

  public myTracks(){
    this.router.navigate(["/beats/my-tracks"])
  }

  private getLogged() {
    this.usuarioService.getByUsername().subscribe(data => {
      this.user = data.login;
      this.userModel = data;
      console.log(this.userModel);
      this.getCarrinho()

    }, err => {
      console.log("eero");
    });
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


  public getTotal(){
    let sum = 0;
    this.cartBeats.forEach(value => {
        sum += (Number(value.precoBeat));
    });
    return sum;
  }




  getProductIndex(beat: Beat): number {
    return this.orderService.ProductOrders.beats.findIndex(
        value => value === beat);
  }

  isProductSelected(beat: Beat): boolean {
      return this.getProductIndex(beat) > -1;
  }

  private calculateTotal(products: Beat[]): String {
    
    let sum = '';
    products.forEach(value => {
        /*let licenses = []
        licenses.push(value.beat.precoBasic)
        licenses.push(value.beat.precoPremium)
        licenses.push(value.beat.precoUnlimited)
        sum += (licenses[value.beat.selected]);*/
        sum += (value.precoBasic);
    });
    return sum;
}

ngOnDestroy() {
    this.sub.unsubscribe();
}

finishOrder() {
    this.orderFinished = true;
    this.orderService.Total = this.total;
    this.onOrderFinished.emit(this.orderFinished);
}

loadTotal() {
    this.sub = this.orderService.OrdersChanged.subscribe(() => {
        this.total = this.calculateTotal(this.orders.beats);
    });
}

loadCart() {
    this.sub = this.orderService.ProductOrderChanged.subscribe(() => {
        let productOrder = this.orderService.SelectedProductOrder;
        if (productOrder) {
            this.orders.beats.push(productOrder);
        }
        this.orderService.ProductOrders = this.orders;
        this.orders = this.orderService.ProductOrders;
        this.total = this.calculateTotal(this.orders.beats);
    });
}

reset() {
    this.orderFinished = false;
    this.orders = new ProductOrders();
    this.orders.beats = []
    this.loadTotal();
    this.total = '';
}



}

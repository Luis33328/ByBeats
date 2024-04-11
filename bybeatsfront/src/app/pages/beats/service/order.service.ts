import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericFilter } from 'src/app/common/generic.filter';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Beat } from '../model/beat.model';
import { ProductOrder } from '../model/productOrder.model';
import { ProductOrders } from '../model/productOrders.model';
import {Subject} from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private productsUrl = "/api/products";
  private ordersUrl = "/private/luiggibeats/pedido";

  private productOrder: Beat;
  private orders: ProductOrders = new ProductOrders();

  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();

  private total: String;


  ProductOrderChanged = this.productOrderSubject.asObservable();
  OrdersChanged = this.ordersSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();


  public HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('currentToken')
  }

  constructor(private http: HttpClient) {
  }

  /*getAllProducts() {
      return this.http.get(this.productsUrl);
  }*/

  saveOrder(order: ProductOrders) {
      return this.http.post(this.ordersUrl, order);
  }

  set SelectedProductOrder(value: Beat) {
      this.productOrder = value;
      this.productOrderSubject.next();
  }

  get SelectedProductOrder() {
      return this.productOrder;
  }

  set ProductOrders(value: ProductOrders) {
      this.orders = value;
      this.ordersSubject.next();
  }

  get ProductOrders() {
      return this.orders;
  }

  get Total() {
      return this.total;
  }

  set Total(value: String) {
      this.total = value;
      this.totalSubject.next();
  }


  

  public list(filter: GenericFilter): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/luiggibeats/pedido/listar/page', filter, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public listWithoutPaginator(): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/pedido/listar', { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public listDesc(): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/pedido/listarDesc', { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public save(pedido: ProductOrder): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/luiggibeats/pedido/salvar', pedido, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public get(id): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/pedido/buscarPorId/' + id, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public uploadImage(formData: FormData): Observable<any> {
    //const file = formData.get('image') as File;
    //const url = environment.baseUrl + `/private/luiggibeats/beat/upload?file=${file.name}`;
        //console.log(formData.get('stems'));
    //console.log(formData.get('wavTagged'));
    //console.log(formData.get('image'));


    console.log(formData.get('files'));

    const url = environment.baseUrl + `/private/luiggibeats/beat/upload`;

    return this.http.post(url, formData , {responseType:'text'});
  }


}

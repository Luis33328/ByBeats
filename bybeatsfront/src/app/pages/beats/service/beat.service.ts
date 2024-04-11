import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericFilter } from 'src/app/common/generic.filter';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Beat } from '../model/beat.model';
import { Usuario } from '../../usuario/model/usuario.model';
import { SignIn } from 'src/app/authentication/signIn/model/signIn.model';
import { Carrinho } from '../model/Carrinho.model';

@Injectable({
  providedIn: 'root'
})
export class BeatService {

  public HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('currentToken')
  }

  constructor(private http: HttpClient) { }

  public getBeatPrice(guidBeat, cart:Carrinho): Observable<any> {


    return this.http.post(environment.baseUrl + '/private/luiggibeats/carrinho/getBeatPrice/' + guidBeat, cart, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }


  public addAoCarrinho(guidBeat, cart:Carrinho): Observable<any> {


    return this.http.post(environment.baseUrl + '/private/luiggibeats/carrinho/addCarrinho/' + guidBeat, cart, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public getCarrinho(user:SignIn): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/luiggibeats/carrinho/getCarrinho/', user, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public list(filter: GenericFilter): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/luiggibeats/beat/listar/page', filter, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public listWithoutPaginator(): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/beat/listar', { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public listDesc(): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/beat/listarDesc', { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public save(beat: Beat): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/luiggibeats/beat/salvar', beat, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public get(id): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/beat/buscarPorId/' + id, { headers: this.HEADERS }).pipe(
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

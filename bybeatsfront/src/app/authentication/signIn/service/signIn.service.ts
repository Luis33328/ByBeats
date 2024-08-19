import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericFilter } from 'src/app/common/generic.filter';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { SignIn } from '../model/signIn.model';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  public HEADERS = {
    'Content-Type': 'application/json'
  }

  constructor(private http: HttpClient) { }

  public list(filter: GenericFilter): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/luiggibeats/usuario/listar/page', filter, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public listWithoutPaginator(): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/usuario/listar', { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public save(usuario: SignIn): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/luiggibeats/usuario/salvar', usuario, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public edit(usuario: SignIn): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/luiggibeats/usuario/editar', usuario, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public get(id): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/usuario/buscarPorId/' + id, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public getByUsername(): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/usuario/buscarPorUsername').pipe(
      map(
        data => data
      )
    );
    
  }
  
  public getByLogin(login): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/usuario/buscarPorLogin/' + login, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
    
  }

  public getByCPF(cpf): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/usuario/buscarPorCPF/' + cpf, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
    
  }

  public getByEmail(email): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/luiggibeats/usuario/buscarPorEmail/' + email, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
    
  }

  



}

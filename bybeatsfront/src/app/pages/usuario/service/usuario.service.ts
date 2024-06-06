import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericFilter } from 'src/app/common/generic.filter';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('currentToken')
  }

  constructor(private http: HttpClient) { }

  public list(filter: GenericFilter): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/pdvocean/usuario/listar/page', filter, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public listWithoutPaginator(): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/pdvocean/usuario/listar', { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public save(usuario: Usuario): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/pdvocean/usuario/salvar', usuario, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public edit(usuario: Usuario): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/pdvocean/usuario/editar', usuario, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public get(id): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/pdvocean/usuario/buscarPorId/' + id, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public getLogged(): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/pdvocean/usuario/buscarPorUsername').pipe(
      map(
        data => data
      )
    );
  }


}

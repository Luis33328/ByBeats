import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericFilter } from 'src/app/common/generic.filter';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PAutorizada } from '../model/autorizados.model';

@Injectable({
  providedIn: 'root'
})
export class PAutorizadaService {

  public HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('currentToken')
  }

  constructor(private http: HttpClient) { }

  public list(filter: GenericFilter): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/pdvocean/pessoaAutorizada/listar/page', filter, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public save(pAutorizada: PAutorizada): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/pdvocean/pessoaAutorizada/salvar', pAutorizada);
  }

  public buscarPorId(id): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/pdvocean/pessoaAutorizada/buscarPorId/' + id, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public listWithoutPaginator(): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/pdvocean/pessoaAutorizada/listar', { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

}

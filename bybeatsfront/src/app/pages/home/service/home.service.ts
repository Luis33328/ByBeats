import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericFilter } from 'src/app/common/generic.filter';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('currentToken')
  }

  constructor(private http: HttpClient) { }

  public list(filter: GenericFilter): Observable<any> {
    return this.http.post(environment.baseUrl + '/private/pdvocean/cliente/listar/page', filter, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }

  public get(id): Observable<any> {
    return this.http.get(environment.baseUrl + '/private/pdvocean/cliente/buscarPorId/' + id, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }


}

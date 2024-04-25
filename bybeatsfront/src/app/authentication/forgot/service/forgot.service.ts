import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignIn } from '../../signIn/model/signIn.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  
  public HEADERS = {
    'Content-Type': 'application/json'
  }

  constructor(private http: HttpClient) { }


  public sendOTP(usuario: SignIn): Observable<any> {
    return this.http.put(environment.baseUrl + '/private/luiggibeats/usuario/atualizarOTP', usuario, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }
  
  public update(usuario: SignIn): Observable<any> {
    return this.http.put(environment.baseUrl + '/private/luiggibeats/usuario/atualizar', usuario, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }
}

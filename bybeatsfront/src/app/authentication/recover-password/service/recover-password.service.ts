import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SignIn } from '../../signIn/model/signIn.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {
  
  public HEADERS = {
    'Content-Type': 'application/json'
  }

  private email = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }
  
  public setEmail(value: string) {
    this.email.next(value);
  }

  public getEmail() {
    return this.email.asObservable();
  }

  public update(usuario: SignIn): Observable<any> {
    return this.http.put(environment.baseUrl + '/private/luiggibeats/usuario/atualizar', usuario, { headers: this.HEADERS }).pipe(
      map(
        data => data
      )
    );
  }
}
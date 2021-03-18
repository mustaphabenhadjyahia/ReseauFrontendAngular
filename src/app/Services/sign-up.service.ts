import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../Models/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class SignUpService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClientSer: HttpClient) {}

  public SignUp(user: User): Observable<User> {
    return  this.httpClientSer.post<User>('http://localhost:9080/PI-DEV-web/rest/candidat/add', user, this.httpOptions );
  }

}

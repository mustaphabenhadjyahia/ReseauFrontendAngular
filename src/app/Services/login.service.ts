import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Candidate} from '../Models/Candidate';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public User = null;

  public isCandidate = false;
  public Candidate: Candidate;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private route: Router, private httpClientSer: HttpClient) { }

  Connexion(mail: string, password: string ) {
    this.httpClientSer.get<any>('http://localhost:9080/PI-DEV-web/rest/candidat/authentification/' +
      mail + '/' + password , this.httpOptions ).subscribe(
      value => {this.User = value; },
      error1 => {},
      () => {  console.log(this.User);

        //   candidate
               this.httpClientSer.get<any>('http://localhost:9080/PI-DEV-web/rest/candidat/' +
          this.User.id, this.httpOptions ).subscribe(
          value => { this.Candidate = value; },
          error1 => {},
          () => {
            console.log(this.Candidate.nom + ' connecté');
            if (this.Candidate != null) {
              this.isCandidate = true;
              sessionStorage.setItem('isCandidate', 'true' );
              sessionStorage.setItem('connectedCandidate', JSON.stringify( this.Candidate));
              this.route.navigate(['/accueil']);
            }
          }
        );
        //////////   fin teacher

      }
    );



  }

  Deconnexion() {
    this.isCandidate = false;
    this.Candidate = null;
    sessionStorage.setItem('isCandidate', 'false' );
    sessionStorage.setItem('connectedCandidate', JSON.stringify( this.Candidate));
    this.route.navigate(['/signIn']);
  }

}

import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ControleSessionCandidatService implements CanActivate {

  constructor(private authSer: LoginService, private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    let CandidateSession = sessionStorage.getItem('isCandidate');

    if ( CandidateSession == 'true') {
      this.authSer.isCandidate = true;
      this.authSer.Candidate = JSON.parse(sessionStorage.getItem('connectedCandidate'));
      console.log('candidat connecte ' + CandidateSession);
    }

    if (this.authSer.isCandidate) {
      // this.route.navigate(['/ProfileTeacher']);
      return true;
    } else {
      this.route.navigate(['/signIn']);
    }

  }
}

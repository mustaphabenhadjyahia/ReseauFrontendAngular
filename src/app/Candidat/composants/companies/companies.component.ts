import { Component, OnInit } from '@angular/core';
import {Offre} from '../../../Models/Offre';
import {Candidate} from '../../../Models/Candidate';
import {CandidatService} from '../../../Services/candidat.service';
import {LoginService} from '../../../Services/login.service';
import {CompanyManager} from '../../../Models/CompanyManager';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  list: CompanyManager[];
  company: CompanyManager;
  candidat: Candidate;
  companies: CompanyManager[];

  term: any;

  constructor(private s: CandidatService, private candidatConnecte: LoginService, private notifier: NotifierService) {}

  ngOnInit() {
    this.s.getCompanies().subscribe(res => this.list = res);
    this.s.EntreprisesAuxQuelsAbonne(this.candidatConnecte.Candidate.id).subscribe(res => this.companies = res);
    this.candidat = this.candidatConnecte.Candidate;
    console.log(this.companies.length);
  }

  public showNotificationSucces(msg: string): void {
    this.notifier.notify('success', 'Vous êtes désormais abonné sur ' + msg);
  }
  public showNotificationErreur(msg: string): void {
    this.notifier.notify('error', 'Vous êtes déjà abonné sur ' + msg);
  }

  public showNotificationDesabonnerSucces(msg: string): void {
    this.notifier.notify('success', 'Vous êtes désabonné de ' + msg);
  }
  public showNotificationDesabonnerErreur(msg: string): void {
    this.notifier.notify('error', 'Vous n êtes pas abonné sur ' + msg);
  }

  Follow(id: number, msg: string) {

    for ( let a of this.companies ) {
      if (a.id === id){
        this.company = a ;
      }
    }

    if ( this.company.id !== id ) {
        this.s.FollowEntreprise(this.candidatConnecte.Candidate.id, id).subscribe();
        this.showNotificationSucces(msg);
        this.ngOnInit();
    }
      // tslint:disable-next-line:triple-equals
    if ( this.company.id == id ) {
        this.showNotificationErreur(msg);
        this.ngOnInit();
    }
    }

    Unfollow(idCompany: number, msg: string) {
      for ( let a of this.companies ) {
        if (a.id === idCompany) {
          this.company = a ;
        }
      }

      if ( this.company.id !== idCompany ) {
        this.showNotificationDesabonnerErreur(msg);
        this.ngOnInit();
      }
      // tslint:disable-next-line:triple-equals
      if ( this.company.id == idCompany) {
        this.s.UnfollowCompany(this.candidatConnecte.Candidate.id, idCompany).subscribe();
        this.showNotificationDesabonnerSucces(msg);
        this.ngOnInit();
      }
    }

  deconnexion(){
    this.candidatConnecte.Deconnexion();
  }



}

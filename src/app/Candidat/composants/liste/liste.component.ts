import { Component, OnInit } from '@angular/core';
import {CandidatService} from '../../../Services/candidat.service';
import {Candidate} from '../../../Models/Candidate';
import {LoginService} from '../../../Services/login.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: []
})
export class ListeComponent implements OnInit {

  list: Candidate[];
  candidat: Candidate;
  term: any;
  contacts: Candidate[];
  contact: Candidate;

  constructor(private s: CandidatService, private candidatConnecte: LoginService, private notifier: NotifierService) {}

  ngOnInit() {
    this.s.getAll().subscribe(res => this.list = res);
    this.candidat = this.candidatConnecte.Candidate;
    console.log(this.candidat);
    this.s.getContacts(this.candidatConnecte.Candidate.id).subscribe(value => this.contacts = value);
  }
  public showNotificationErreur(msg: string): void {
       this.notifier.notify('error', 'Vous êtes déjà abonné sur ' + msg);
      }
  public showNotificationSucces(msg: string): void {
    this.notifier.notify('success', 'Vous êtes désormais abonné sur ' + msg);
  }



  follow(id: number, msg: string) {
    for (let a of this.contacts) {
      if (a.id === id) {
        this.contact = a;}}
    if (this.contact.id === id) {
        this.showNotificationErreur(msg);
        this.ngOnInit(); }
    if (this.contact.id !== id) {
        this.s.FollowCandidat(this.candidatConnecte.Candidate.id, id).subscribe();
        this.showNotificationSucces(msg);
        this.ngOnInit();
      }
    }

    deconnexion(){
    this.candidatConnecte.Deconnexion();
    }
}

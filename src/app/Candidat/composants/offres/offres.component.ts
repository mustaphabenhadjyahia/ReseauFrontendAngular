import { Component, OnInit } from '@angular/core';
import {Candidate} from '../../../Models/Candidate';
import {CandidatService} from '../../../Services/candidat.service';
import {LoginService} from '../../../Services/login.service';
import {Offre} from '../../../Models/Offre';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {

  list: Offre[];
  candidat: Candidate;
  term: any;
  offres: Offre[];
  offre: Offre;
  constructor(private s: CandidatService, private candidatConnecte: LoginService, private notifier: NotifierService) {}

  ngOnInit() {
    this.s.getOffres().subscribe(res => this.list = res);
    this.candidat = this.candidatConnecte.Candidate;
    this.s.OffresAuxQuelsaPostule(this.candidatConnecte.Candidate.id).subscribe(value => this.offres = value);
  }

  public showNotificationPostulerErreur(msg: string): void {
    this.notifier.notify('error', 'Vous avez déjà postulé pour ' + msg);
  }
  public showNotificationPostulerSucces(msg: string): void {
    this.notifier.notify('success', 'Vous êtes désormais candidat pour ' + msg);
  }
  public showNotificationDepostulerErreur(msg: string): void {
    this.notifier.notify('error', 'Vous n êtes pas candidat pour ' + msg);
  }
  public showNotificationDepostulerSucces(msg: string): void {
    this.notifier.notify('success', 'Vous avez annulé votre candidature pour ' + msg);
  }

  Postuler(idOffre: number, msg: string) {

    for (let a of this.offres) {
      if (a.id === idOffre) {
        this.offre = a;}
    }
    if (this.offre.id !== idOffre) {
      this.s.PostulerPourOffre(idOffre, this.candidat.id).subscribe();
      this.showNotificationPostulerSucces(msg);
      this.ngOnInit();
    }
    if (this.offre.id === idOffre){
        this.showNotificationPostulerErreur(msg);}
    this.ngOnInit();
    }

  Depostuler(idOffre: number, msg: string) {
    for (let a of this.offres) {
      if (a.id === idOffre) {
        this.offre = a;
      }}
    if (this.offre.id === idOffre){
        this.s.DepostulerPourOffre(this.candidatConnecte.Candidate.id, idOffre).subscribe();
        this.showNotificationDepostulerSucces(msg);
        this.ngOnInit();
      }
    if (this.offre.id !== idOffre) {
        this.showNotificationDepostulerErreur(msg);
        this.ngOnInit();
      }
    }


  deconnexion() {
    this.candidatConnecte.Deconnexion();
  }
}

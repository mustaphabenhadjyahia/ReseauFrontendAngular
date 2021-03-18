import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../Services/login.service';
import {CandidatService} from '../../../Services/candidat.service';
import {Candidate} from '../../../Models/Candidate';
import {CompanyManager} from '../../../Models/CompanyManager';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  candidat: Candidate;
  contacts: Candidate[];
  followers: Candidate[];
  companies: CompanyManager[];
  constructor(private candidatConnecte: LoginService, private s: CandidatService) { }

  ngOnInit() {
    this.candidat = this.candidatConnecte.Candidate;
    this.s.getContacts(this.candidatConnecte.Candidate.id).subscribe(value => this.contacts = value);
    this.s.Followers(this.candidatConnecte.Candidate.id).subscribe(value => this.followers = value);
    this.s.EntreprisesAuxQuelsAbonne(this.candidatConnecte.Candidate.id).subscribe(res => this.companies = res);
  }

  deconnexion() {
    this.candidatConnecte.Deconnexion();
  }

  /*afficher() {
    this.show = false;
  }*/
}

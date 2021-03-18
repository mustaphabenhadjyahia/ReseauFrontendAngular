import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CandidatService} from '../../../Services/candidat.service';
import {Candidate} from '../../../Models/Candidate';
import {Observable} from 'rxjs';
import {LoginService} from '../../../Services/login.service';
import {User} from '../../../Models/User';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-profil-by-id',
  templateUrl: './profil-by-id.component.html',
  styleUrls: ['./profil-by-id.component.css']
})
export class ProfilByIdComponent implements OnInit {

  private parmurl: number;
  private candidat: Candidate;
  private c: Candidate;
  parcours: string[];
  list: Candidate[];
  contacts: Candidate[];
  contact: Candidate;
  following: Candidate[];
  followers: Candidate[];

  constructor( private activatedroute: ActivatedRoute, private s: CandidatService, private cc: LoginService, private notifier: NotifierService) {}
  ngOnInit() {
    this.activatedroute.paramMap.subscribe
    (result => this.parmurl = Number(result.get('id')) );
    this.s.getById(this.parmurl).subscribe(value => this.c = value);
    this.candidat = this.cc.Candidate;
    this.s.getContacts(this.cc.Candidate.id).subscribe(res => this.contacts = res);
    this.s.getContacts(this.parmurl).subscribe(res1 => this.following = res1);
    this.s.Followers(this.parmurl).subscribe(value => this.followers = value);
  }
  deconnexion() {
    this.cc.Deconnexion();
  }

  public showNotificationFollowSucces(msg: string): void {
    this.notifier.notify('success', 'Vous êtes désormais abonné sur ' + msg);
  }
  public showNotificationFollowErreur(msg: string): void {
    this.notifier.notify('error', 'Vous êtes déjà abonné sur ' + msg);
  }
  public showNotificationUnFollowSucces(msg: string): void {
    this.notifier.notify('success', 'Vous vous êtes désabonné de ' + msg);
  }
  public showNotificationUnFollowErreur(msg: string): void {
    this.notifier.notify('error', 'Vous nêtes pas abonné sur ' + msg);
  }

  Follow(id: number, msg: string) {
    for (let a of this.contacts) {
      if (a.id === id) {
        this.contact = a;
      }
    }
    if(this.contact.id === id){
      this.showNotificationFollowErreur(msg);
      this.ngOnInit();
    }
    if (this.c.id !== id) {
      this.s.FollowCandidat(this.cc.Candidate.id, id).subscribe();
      this.showNotificationFollowSucces(msg);
      this.ngOnInit();
    }
  }

  Unfollow(id: number, msg: string) {
    for (let a of this.contacts) {
      if (a.id === id) {
        this.contact = a;
      }
    }
    if(this.contact.id === id) {
        this.s.UnfollowCandidat(this.cc.Candidate.id, id).subscribe();
        this.showNotificationUnFollowSucces(msg);
        this.ngOnInit(); }
    if (this.contact.id !== id) {
      this.showNotificationUnFollowErreur(msg);
      this.ngOnInit();
    }
  }
}

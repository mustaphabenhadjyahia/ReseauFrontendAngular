import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CandidatService} from '../Services/candidat.service';
import {LoginService} from '../Services/login.service';
import {error} from 'util';

@Component({
  selector: 'app-valider-compte',
  templateUrl: './valider-compte.component.html',
  styleUrls: ['./valider-compte.component.css']
})
export class ValiderCompteComponent implements OnInit {

  private parmurl: string;
  private msg: string;
  constructor( private activatedroute: ActivatedRoute, private s: CandidatService) {}

  ngOnInit() {
    this.activatedroute.paramMap.subscribe
    (result => this.parmurl = String(result.get('token')) );
    this.s.ValiderCompte(this.parmurl).subscribe(value => {},
      error1 => {this.msg = error1.error.text; });
  }
}

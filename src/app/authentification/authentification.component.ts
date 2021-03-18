import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../Services/login.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent implements OnInit {

  constructor(private s: LoginService) { }
  UserForm = new FormGroup({
    mail: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit() {
  }

  Login() {
    this.s.Connexion(this.UserForm.value.mail, this.UserForm.value.password);
  }


  get Mail() {
    return this.UserForm.get('mail');
  }
  get Password() {
    return this.UserForm.get('password');
  }
}

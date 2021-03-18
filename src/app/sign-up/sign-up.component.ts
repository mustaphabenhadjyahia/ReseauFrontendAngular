import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../Models/User';
import {SignUpService} from '../Services/sign-up.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    '../../assets/css/animate.css',
    '../../assets/css/bootstrap.min.css',
    '../../assets/css/line-awesome.css',
    '../../assets/css/line-awesome-font-awesome.min.css',
    '../../assets/css/font-awesome.min.css',
    '../../assets/css/style.css',
    '../../assets/css/responsive.css',
    '../../assets/lib/slick/slick-theme.css',
    '../../assets/lib/slick/slick.css'
  ]
})
export class SignUpComponent implements OnInit {

  modalRef: BsModalRef;
  user: User;
  constructor(private s: SignUpService, private route: Router, private modalService: BsModalService) { }
  Inscription = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
  }

  ajouter() {
    this.user = new User(this.Inscription.value['nom'], this.Inscription.value['prenom'],this.Inscription.value['mail'],
      this.Inscription.value['password']);
    console.log(this.user);
    this.s.SignUp(this.user).subscribe();
}

  get Nom() {
    return this.Inscription.get('nom');
  }
  get Prenom() {
    return this.Inscription.get('prenom');
  }
  get Mail() {
    return this.Inscription.get('mail');
  }
  get Password() {
    return this.Inscription.get('password');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  redirect() {
    this.route.navigate(['/signIn']);
  }
}

import {Component, OnInit, TemplateRef} from '@angular/core';
import {Candidate} from '../../../Models/Candidate';
import {LoginService} from '../../../Services/login.service';
import {CandidatService} from '../../../Services/candidat.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {User} from '../../../Models/User';
import {Offre} from '../../../Models/Offre';
import {CompanyManager} from '../../../Models/CompanyManager';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  modalRef: BsModalRef;
  candidat: Candidate;
  competences: string[] = [];
  experiences: string[] = [];
  certifications: string[] = [];
  parcours: string[] = [];
  file: File;
  img: string;
  contacts: Candidate[];
  followers: Candidate[];
  offres: Offre[];
  entreprises: CompanyManager[];


  constructor(private candidatConnecte: LoginService, private s: CandidatService, private modalService: BsModalService) { }

  ModifForm = new FormGroup({
    bio: new FormControl(''),
    parcours: new FormControl(''),
    experiences: new FormControl(''),
    competences: new FormControl(''),
    certifications: new FormControl(''),
    adresse: new FormControl(''),
    numTel: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)] ),
    photoProfil: new FormControl(''),
  });

  ngOnInit() {
    this.candidat = this.candidatConnecte.Candidate;
    console.log(this.candidat);
    this.s.getContacts(this.candidatConnecte.Candidate.id).subscribe(value => this.contacts = value);
    this.s.Followers(this.candidatConnecte.Candidate.id).subscribe(value => this.followers = value);
    this.s.EntreprisesAuxQuelsAbonne(this.candidatConnecte.Candidate.id).subscribe(value => this.entreprises = value);

    if (this.candidat.competences != null) {
    this.competences = this.candidat.competences.split(',' , this.candidat.competences.length); }
    if (this.candidat.experiences != null) {
    this.experiences = this.candidat.experiences.split(',' , this.candidat.experiences.length); }
    if (this.candidat.parcours != null) {
    this.parcours = this.candidat.parcours.split(',' , this.candidat.parcours.length); }
    if (this.candidat.certification != null) {
      this.certifications = this.candidat.certification.split(',' , this.candidat.certification.length); }

    this.ModifForm.get('bio').setValue(this.candidat.bio);
    this.ModifForm.get('parcours').setValue(this.candidat.parcours);
    this.ModifForm.get('experiences').setValue(this.candidat.experiences);
    this.ModifForm.get('competences').setValue(this.candidat.competences);
    this.ModifForm.get('certifications').setValue(this.candidat.certification);
    this.ModifForm.get('adresse').setValue(this.candidat.adresse);
    this.ModifForm.get('numTel').setValue(this.candidat.numTel);
    this.ModifForm.get('photoProfil').setValue(this.candidat.photoProfil);

    this.s.OffresAuxQuelsaPostule(this.candidatConnecte.Candidate.id).subscribe(value => this.offres = value);
    /* this.experiences = this.candidat.experiences.split(',' , this.candidat.experiences.length);
     this.certifications = this.candidat.certification.split(',' , this.candidat.certification.length);
     this.parcours = this.candidat.parcours.split(',' , this.candidat.parcours.length);*/

  }
  get Tel() {
    return this.ModifForm.get('numTel');
  }
  deconnexion() {
    this.candidatConnecte.Deconnexion();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  modifier() {
    this.candidat.bio = this.ModifForm.value['bio'];
    this.candidat.parcours = this.ModifForm.value['parcours'];
    this.candidat.experiences = this.ModifForm.value['experiences'];
    this.candidat.competences = this.ModifForm.value['competences'];
    if (this.candidat.competences != null) { this.competences = this.candidat.competences.split(',' , this.candidat.competences.length); }
    this.candidat.certification = this.ModifForm.value['certifications'];
    this.candidat.adresse = this.ModifForm.value['adresse'];
    this.candidat.numTel = this.ModifForm.value['numTel'];
    this.candidat.photoProfil = this.ModifForm.value['photoProfil'];
    console.log('bio', this.candidat.bio);
    console.log('parcours', this.candidat.parcours);
    console.log('exps', this.candidat.experiences);
    console.log('comptnces', this.candidat.competences);
    console.log('certifs', this.candidat.certification);
    console.log('adresse', this.candidat.adresse);
    console.log('pdp', this.candidat.photoProfil);
    this.s.modifier(this.candidat).subscribe();
    this.candidatConnecte.Candidate = this.candidat;
    sessionStorage.setItem('connectedCandidate', JSON.stringify( this.candidat));
    console.log(this.candidat);
    console.log(this.candidatConnecte.Candidate);
    this.ngOnInit();
  }

   onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      console.log(file.name);
      console.log(file.path);
      this.file = file;
      this.ModifForm.get('photoProfil').setValue(this.file.name);
      this.s.modifier(this.candidat).subscribe();
      this.candidat.photoProfil = this.file.name;
    }
  }

  generatePdf() {
    pdfMake.createPdf(this.docDef()).open();
  }

  docDef() {
    return {
  content : [
    {
    text: 'Curriculum Vitae',
      bold: true,
    fontSize: 20,
    alignment: 'center',
    margin: [0, 0, 0, 20]
  },
  {
    columns: [
      [{
        text: this.candidat.nom + ' ' + this.candidat.prenom,
        style: 'name'
      },
        {
          text: 'Email : ' + this.candidat.mail,
        },
        {
          text: 'Telephone : +(216) ' + this.candidat.numTel
        },
        {
          text: 'Adresse : ' + this.candidat.adresse
        },

      ],
      /*{
        image: this.getBase64('file:///C:/Users/mustapha_bhy/Desktop/Projets Angular/PI-DEV/src/assets/images/Ben Hadj Yahia Mustapha.PNG'),
        width: 75,
        alignment : 'right'
      }*/
    ]
  },
    {
      text: 'Parcours Académique',
      style: 'header'
    },
    this.getParcoursObject(this.parcours),
    {
      text: 'Expériences',
      style: 'header'
    },
    this.getExperiencesObject(this.experiences),

    {
      text: 'Compétences',
      style: 'header'
    },
    {
      columns : [
        {
          ul : [
            ...this.competences.filter((value, index) => index % 3 === 0).map(s => s.valueOf())
          ]
        },
        {
          ul : [
            ...this.competences.filter((value, index) => index % 3 === 1).map(s => s.valueOf())
          ]
        },
        {
          ul : [
            ...this.competences.filter((value, index) => index % 3 === 2).map(s => s.valueOf())
          ]
        }
      ]
    },
    {
      text: 'Certifications',
      style: 'header'
    },
    {
      columns : [
        {
          ul : [
            ...this.certifications.filter((value, index) => index % 3 === 0).map(s => s.valueOf())
          ],
        },
        {
          ul : [
            ...this.certifications.filter((value, index) => index % 3 === 1).map(s => s.valueOf())
          ]
        },
        {
          ul : [
            ...this.certifications.filter((value, index) => index % 3 === 2).map(s => s.valueOf())
          ]
        }
]}
      ],
    styles: {
      header: {
        fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
      },
      name: {
        fontSize: 16,
          bold: true
      },
      jobTitle: {
        fontSize: 14,
          bold: true,
          italics: true
      },
      sign: {
        margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
      },
      tableHeader: {
        bold: true,
      }
    }
  };
}


  getParcoursObject(parcours: string[]) {
    const exs = [];
    for (let a of parcours ) {
      exs.push(
        [{
          columns: [
            [{
              text: a,
              style: 'jobTitle'
            }],
                      ]
        }]
      );
    }
    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  getExperiencesObject(experiences: string[]) {
    const exs = [];
    for (let a of experiences ) {
      exs.push(
        [{
          columns: [
            [{
              text: a,
              style: 'jobTitle'
            }],
          ]
        }]
      );
    }
    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }


  /*getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.candidat.photoProfil = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }*/

}

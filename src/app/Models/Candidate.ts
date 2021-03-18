import {User} from './User';

export class Candidate {
  id: number;
  constructor(public nom: string, public prenom: string, public mail: string, public password: string) {}
  adresse: string;
  bio: string;
  parcours: string;
  certification: string;
  competences: string;
  experiences: string;
  photoProfil: string;
  photoCouverture: string;
  numTel: number;
  cv: string;
}

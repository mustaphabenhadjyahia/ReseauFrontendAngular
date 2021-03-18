import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthentificationComponent} from './authentification/authentification.component';
import {SignUpService} from './Services/sign-up.service';
import {ListeComponent} from './Candidat/composants/liste/liste.component';
import {AccueilComponent} from './Candidat/composants/accueil/accueil.component';
import {ProfilComponent} from './Candidat/composants/profil/profil.component';
import {ControleSessionCandidatService} from './Services/controle-session-candidat.service';
import {ProfilByIdComponent} from './Candidat/composants/profil-by-id/profil-by-id.component';
import {ValiderCompteComponent} from './valider-compte/valider-compte.component';
import {OffresComponent} from './Candidat/composants/offres/offres.component';
import {CompaniesComponent} from './Candidat/composants/companies/companies.component';

const routes: Routes = [
  {path: '', component: AuthentificationComponent},
  {path: 'signUp', component: SignUpComponent, },
  {path: 'signIn', component: AuthentificationComponent},
  {path: 'accueil', component: AccueilComponent , canActivate : [ControleSessionCandidatService]},
  {path: 'monProfil', component: ProfilComponent , canActivate : [ControleSessionCandidatService]},
  { path: 'Profil/:id', component: ProfilByIdComponent, canActivate : [ControleSessionCandidatService]},
  {path: 'listeCandidats', component: ListeComponent, canActivate : [ControleSessionCandidatService]},
  { path: 'validerCompte/:token', component: ValiderCompteComponent},
  {path: 'offres', component: OffresComponent, canActivate : [ControleSessionCandidatService]},
  {path: 'companies', component: CompaniesComponent, canActivate : [ControleSessionCandidatService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

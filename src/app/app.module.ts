import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import { AccueilComponent } from './Candidat/composants/accueil/accueil.component';
import { ListeComponent } from './Candidat/composants/liste/liste.component';
import { ProfilComponent } from './Candidat/composants/profil/profil.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProfilByIdComponent } from './Candidat/composants/profil-by-id/profil-by-id.component';
import { ValiderCompteComponent } from './valider-compte/valider-compte.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AgmCoreModule} from '@agm/core';
import { OffresComponent } from './Candidat/composants/offres/offres.component';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { CompaniesComponent } from './Candidat/composants/companies/companies.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    SignUpComponent,
    AccueilComponent,
    ListeComponent,
    ProfilComponent,
    ProfilByIdComponent,
    ValiderCompteComponent,
    OffresComponent,
    CompaniesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    Ng2SearchPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBPYmgVh13XiX8gqhVki6A5xPwB3mDDO6U',
    }),
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

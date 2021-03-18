import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Candidate} from '../Models/Candidate';
import {User} from '../Models/User';
import {Offre} from '../Models/Offre';
import {CompanyManager} from '../Models/CompanyManager';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClientSer: HttpClient) {
  }

  public getAll(): Observable<Candidate[]> {
    return this.httpClientSer.get<Candidate[]>('http://localhost:9080/PI-DEV-web/rest/candidat');
  }
  public getById(id: number): Observable<Candidate> {
    return this.httpClientSer.get<Candidate>('http://localhost:9080/PI-DEV-web/rest/candidat/' + id);
  }
  public modifier(c: Candidate): Observable<Candidate> {
    return  this.httpClientSer.put<Candidate>('http://localhost:9080/PI-DEV-web/rest/candidat', c , this.httpOptions );
  }
  public ValiderCompte(token: string): Observable<string> {
    return this.httpClientSer.get<string>('http://localhost:9080/PI-DEV-web/rest/candidat/VerifierCompte/' + token);
  }

  public FollowCandidat(idConnecte: number, idContact: number): Observable<string> {
    return this.httpClientSer.post<string>('http://localhost:9080/PI-DEV-web/rest/candidat/ajoutContact/' + idConnecte + '/' + idContact,
      this.httpOptions);
  }

  public getContacts(id: number): Observable<Candidate[]> {
    return this.httpClientSer.get<Candidate[]>('http://localhost:9080/PI-DEV-web/rest/candidat/ContactsdeCandidat/' + id);
  }

  public getOffres(): Observable<Offre[]> {
    return this.httpClientSer.get<Offre[]>('http://localhost:9080/PI-DEV-web/rest/candidat/AllOffres');
  }

  public PostulerPourOffre(idOffre: number, idConnecte: number): Observable<string> {

    return this.httpClientSer.post<string>('http://localhost:9080/PI-DEV-web/rest/candidat/PostulerPourOffre/' + idOffre + '/' + idConnecte,
      this.httpOptions);
  }

  public OffresAuxQuelsaPostule(id: number): Observable<Offre[]> {
    return this.httpClientSer.get<Offre[]>('http://localhost:9080/PI-DEV-web/rest/candidat/OffresAuxQuelsaPostule/' + id);
  }

  public getCompanies(): Observable<CompanyManager[]> {
    return this.httpClientSer.get<CompanyManager[]>('http://localhost:9080/PI-DEV-web/rest/candidat/AllCompanies');
  }

  public FollowEntreprise(idConnecte: number, idCompany: number): Observable<string> {
    return this.httpClientSer.post<string>('http://localhost:9080/PI-DEV-web/rest/candidat/SabonnerAEntreprise/' + idConnecte + '/' + idCompany,
      this.httpOptions);
  }

  public UnfollowCandidat(idConnecte: number, idContact: number): Observable<string> {
    return this.httpClientSer.delete<string>('http://localhost:9080/PI-DEV-web/rest/candidat/desabonnerCandidat/' + idConnecte + '/' + idContact,
      this.httpOptions);
  }
  public DepostulerPourOffre(idConnecte: number, idOffre: number): Observable<string> {
    return this.httpClientSer.delete<string>('http://localhost:9080/PI-DEV-web/rest/candidat/depostulerPourOffre/' + idConnecte + '/' + idOffre,
      this.httpOptions);
  }
  public getOffreById(id: number): Observable<Offre> {
    return this.httpClientSer.get<Offre>('http://localhost:9080/PI-DEV-web/rest/candidat/offre/' + id);
  }
  public getCompanyById(id: number): Observable<CompanyManager> {
    return this.httpClientSer.get<CompanyManager>('http://localhost:9080/PI-DEV-web/rest/candidat/company/' + id);
  }

  public Followers(id: number): Observable<Candidate[]> {
    return this.httpClientSer.get<Candidate[]>('http://localhost:9080/PI-DEV-web/rest/candidat/followers/' + id);
  }

  public EntreprisesAuxQuelsAbonne(id: number): Observable<CompanyManager[]> {
    return this.httpClientSer.get<CompanyManager[]>('http://localhost:9080/PI-DEV-web/rest/candidat/ListeEntreprisesAuxQuelsCandidatEstAbonne/' + id);
  }

  public UnfollowCompany(id: number, idCompany: number): Observable<string> {
    return this.httpClientSer.post<string>('http://localhost:9080/PI-DEV-web/rest/candidat/DesabonnerAEntreprise/' + id + '/' + idCompany, this.httpOptions);
  }



}

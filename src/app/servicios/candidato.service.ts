import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidato } from '../models/candidato.model';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  //private apiUrl = 'http://localhost:8080/api/candidatos';
  private apiUrl = `${environment.apiUrl}/candidatos`;

  constructor(private http: HttpClient) { }


  getCandidatoById(id: number): Observable<Candidato> {
    return this.http.get<Candidato>(`${this.apiUrl}/${id}`);
  }

  getCandidatosByIdoferta(idoferta: number): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(`${this.apiUrl}/oferta/${idoferta}`);
  }

  updateCandidato(id: number, candidato: Partial<Candidato>): Observable<Candidato> {
        return this.http.put<Candidato>(`${this.apiUrl}/${id}`, candidato);
  }

  comprobarExistenciaCandidato(id: number): Observable<boolean> {
    console.log('He entrat en el metode comprobarExistenciaCandidato: ',id);
    return this.http.get<boolean>(`${this.apiUrl}/existe/${id}`);
  }

  createCandidato(idcandidato: number): Observable<Candidato> {
    console.log('He entrat en el metode crear candidat: ',idcandidato);
    return this.http.post<Candidato>(`${this.apiUrl}/crear/${idcandidato}`, {});
  }
}

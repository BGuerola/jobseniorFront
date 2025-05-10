import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oferta } from '../models/oferta.model';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class OfertasinscritoService {
  //private apiUrl = 'http://localhost:8080/api/ofertas';
  private apiUrl = `${environment.apiUrl}/ofertas`;
  constructor(private http: HttpClient) { }

  obtenerOfertasPorCandidato(idcandidato: Number): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(`${this.apiUrl}/candidato/${idcandidato}`);
  }

  obtenerOfertasPorEmpresa(idempresa: Number): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(`${this.apiUrl}/empresa/${idempresa}`);
  }

  getOfertaById(idoferta: number) {
    return this.http.get<Oferta>(`${this.apiUrl}/${idoferta}`);
  }

  crearOferta(oferta: Oferta): Observable<Oferta> {
    return this.http.post<Oferta>(this.apiUrl, oferta);
  }
}

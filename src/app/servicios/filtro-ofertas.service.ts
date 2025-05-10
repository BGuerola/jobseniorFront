import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oferta } from '../models/oferta.model'; // <-- Importar la interfaz
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class FiltroOfertasService {
  //private apiUrl = 'http://localhost:8080/api/ofertas';
  private apiUrl = `${environment.apiUrl}/ofertas`;

  constructor(private http: HttpClient) {}
  getOfertas(filtros: any): Observable<Oferta[]> {
    let params = new HttpParams();
    if (filtros.fecha) params = params.set('fecha', filtros.fecha);
    if (filtros.empresa) params = params.set('empresa', filtros.empresa);
    if (filtros.profesion) params = params.set('profesion', filtros.profesion);
    if (filtros.provincia) params = params.set('provincia', filtros.provincia);

    return this.http.get<Oferta[]>(this.apiUrl, { params });
  }
}

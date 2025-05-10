import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Postulacion } from '../models/postulacion.model';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {
  //private apiUrl = 'http://localhost:8080/api/postulaciones';
  private apiUrl = `${environment.apiUrl}/postulaciones`;
  constructor(private http: HttpClient) { }

  verificarPostulacion(idcandidato: number, idoferta: number): Observable<Postulacion | null> {
    const url = `${this.apiUrl}/${idcandidato}/${idoferta}`;
    return this.http.get<Postulacion>(url);
  }

  crearPostulacion(postulacion: Postulacion): Observable<any> {
    return this.http.post(this.apiUrl, postulacion);
  }

  getPostulacion(idoferta: number, idcandidato: number) {
    return this.http.get<Postulacion>(`${this.apiUrl}/${idoferta}/${idcandidato}`);
  }

  updatePostulacion(postulacion: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${postulacion.idpostulacion}`, postulacion);
  }
  }

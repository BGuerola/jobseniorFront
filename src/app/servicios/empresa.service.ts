import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa.model';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  //private apiUrl = 'http://localhost:8080/api/empresas';
  private apiUrl = `${environment.apiUrl}/empresas`;

  constructor(private http: HttpClient) { }

    getEmpresaById(id: number): Observable<Empresa> {
      return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
    }

    updateEmpresa(id: number, empresa: Partial<Empresa>): Observable<Empresa> {
      return this.http.put<Empresa>(`${this.apiUrl}/${id}`, empresa);
    }

    comprobarExistenciaEmpresa(id: number): Observable<boolean> {
      console.log('He entrat en el metode comprobarExistenciaEmpresa: ',id);
      return this.http.get<boolean>(`${this.apiUrl}/existe/${id}`);
    }

    createEmpresa(idempresa: number): Observable<Empresa> {
      console.log('He entrat en el metode crear empresa: ',idempresa);
      return this.http.post<Empresa>(`${this.apiUrl}/crear/${idempresa}`, {});
    }
}

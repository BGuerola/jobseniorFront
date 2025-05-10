import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatoService } from '../../servicios/candidato.service';
import { CookieService } from 'ngx-cookie-service';
import { Candidato } from '../../models/candidato.model';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css'
})
export class CVComponent implements OnInit{
  candidato: Candidato = {
    nombre: '',
    correo: '',
    url: '',
    descripcion: ''
  };

  constructor(
    private candidatoService: CandidatoService,
    private cookies: CookieService
  ) {}

  ngOnInit(): void {
    const id = Number(this.cookies.get('id'));

    if (!isNaN(id)) {
      this.candidatoService.getCandidatoById(id).subscribe({
        next: (data) => this.candidato = data,
        error: (err) => console.error('Error al obtener el candidato:', err)
      });
    } else {
      console.warn('ID inválido en la cookie');
    }
  }

  guardar(): void {
    const id = Number(this.cookies.get('id'));
    this.candidatoService.updateCandidato(id, this.candidato).subscribe(() => {
      alert('Candidato actualizado correctamente');
    });
  }

}



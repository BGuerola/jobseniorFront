import { Component, Output, EventEmitter } from '@angular/core';
import { InscritosComponent } from '../inscritos/inscritos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrl: './candidat.component.css'
})
export class CandidatComponent {
  @Output() cambiarComponente = new EventEmitter<string>();
  componentCand: string = 'insc';

  cambiarCompCand(nuevoComponente: string) {
    this.componentCand = nuevoComponente;
  }

}





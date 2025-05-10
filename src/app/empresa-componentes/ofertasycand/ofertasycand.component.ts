import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../models/candidato.model';
import { Oferta } from '../../models/oferta.model';
import { OfertasinscritoService } from '../../servicios/ofertasinscrito.service';
import { CandidatoService } from '../../servicios/candidato.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ofertasycand',
  templateUrl: './ofertasycand.component.html',
  styleUrl: './ofertasycand.component.css'
})
export class OfertasycandComponent implements OnInit {
  oferta: Oferta | null = null;
  candidato: Candidato | null = null;
  candidatospostulados: Candidato[] = [];
  idoferta!: number;

    constructor(
      private route: ActivatedRoute,
      private ofertasinscritoService: OfertasinscritoService,
      private candidatoService: CandidatoService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.idoferta = Number(params['idoferta']);
        if (this.idoferta) {
          this.cargarOferta(this.idoferta);
          this.cargarCandidatosOferta(this.idoferta);

        } else {
          console.error('No se encontró el id de la oferta');
        }
    });
    }

    cargarOferta(idoferta: number): void { // ← corregido aquí
      this.ofertasinscritoService.getOfertaById(idoferta).subscribe({
        next: (data) => this.oferta = data,
        error: (err) => console.error('Error al cargar las ofertas:', err)
      });
    }

    cargarCandidatosOferta(idoferta: number): void {
      this.candidatoService.getCandidatosByIdoferta(idoferta).subscribe({
          next: (data) => this.candidatospostulados = data,
          error: (err) => console.error('Error al cargar las ofertas:', err)
        });
    }

    irAPostulado(idoferta: number, idcandidato: number): void {
      this.router.navigate(['/postulado', idoferta, idcandidato]);
  }
}

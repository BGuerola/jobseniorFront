import { Component, Input,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasinscritoService } from '../../servicios/ofertasinscrito.service';
import { PostulacionService } from '../../servicios/postulacion.service';
import { Oferta } from '../../models/oferta.model';
import { Postulacion } from '../../models/postulacion.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ampl-ofert-cand',
  templateUrl: './ampl-ofert-cand.component.html',
  styleUrl: './ampl-ofert-cand.component.css'
})
export class AmplOfertCandComponent {

  idoferta!: number;
  idcandidato!: number;
  oferta: Oferta | null = null;
  postulacion: Postulacion | null = null;

  constructor(
    private route: ActivatedRoute,
    private ofertasinscritoService: OfertasinscritoService,
    private postulacionService: PostulacionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idoferta    = Number(params.get('idoferta'));
      this.idcandidato = Number(params.get('idcandidato'));

      if (this.idoferta && this.idcandidato) {
        this.cargarDatos();
      } else {
        console.error('Faltan parámetros para cargar datos');
      }
    });
  }

  cargarDatos() {
    forkJoin({
      oferta: this.ofertasinscritoService.getOfertaById(this.idoferta),
      postulacion: this.postulacionService.getPostulacion(this.idoferta, this.idcandidato)
    }).subscribe({
      next: ({ oferta, postulacion }) => {this.oferta = oferta;this.postulacion = postulacion;},
      error: (error) => {
        alert('Error verificando postulación: ' + (error|| 'Error desconocido'));
      }
    });
  }
}

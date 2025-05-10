import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Postulacion } from '../../models/postulacion.model';
import { OfertasinscritoService } from '../../servicios/ofertasinscrito.service';
import { PostulacionService } from '../../servicios/postulacion.service';
import { CandidatoService } from '../../servicios/candidato.service';
import { Candidato } from '../../models/candidato.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-postulado',
  templateUrl: './postulado.component.html',
  styleUrl: './postulado.component.css'
})
export class PostuladoComponent {
  estadoSeleccionado: string | null = null;
  idoferta!: number;
  idcandidato!: number;

  candidato: Candidato = {
    idcandidato: 0,
    nombre: '',
    correo: '',
    url: '',
    descripcion: ''
  }

  postulacion: Postulacion = {
    id: 0,
    idcandidato: 0,
    idoferta: 0,
    estado: '',
    motivacion: ''
  }


  constructor(
    private route: ActivatedRoute,
    private postulacionService: PostulacionService,
    private candidatoService: CandidatoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idoferta    = Number(params.get('idoferta'));
      this.idcandidato = Number(params.get('idcandidato'));

      console.log('Params recibidos →', {
        idoferta: this.idoferta,
        idcandidato: this.idcandidato
      });
      if (this.idoferta && this.idcandidato) {
        this.cargarDatos();
      } else {
        console.error('Faltan parámetros para cargar datos');
      }
    });
  }


  cargarDatos() {
    console.log('ID Candidato:', this.idcandidato);
    console.log('ID Oferta:', this.idoferta);
    forkJoin({
      candidato: this.candidatoService.getCandidatoById(this.idcandidato),
      postulacion: this.postulacionService.getPostulacion(this.idoferta, this.idcandidato)
    }).subscribe({
      next: ({ candidato, postulacion }) => {
        console.log('Candidato:', candidato); // Imprimir el candidato
        console.log('Postulacion:', postulacion); // Imprimir la postulacion
        this.candidato = candidato;
        this.postulacion = postulacion;
        console.log('ID Postulacion:', this.postulacion?.id);
      },
      error: (error) => {
        console.error('Error cargando datos', error);
      }
    });
  }

  actualizarEstado(estado: string): void {
    this.estadoSeleccionado = estado;

    const postulacion = {
      idpostulacion: this.postulacion.id,
      estado: estado,
    };

    this.postulacionService.updatePostulacion(postulacion).subscribe({
      next: (data) => {
        console.log('Estado actualizado:', data);
      },
      error: (err) => {
        console.error('Error al actualizar el estado', err);
      }
    });
  }
}



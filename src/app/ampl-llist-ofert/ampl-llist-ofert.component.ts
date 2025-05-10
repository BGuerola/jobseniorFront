import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Oferta } from '../models/oferta.model';
import { CookieService } from 'ngx-cookie-service';
import { PostulacionService } from '../servicios/postulacion.service';
import { Postulacion } from '../models/postulacion.model';

@Component({
  selector: 'app-ampl-llist-ofert',
  templateUrl: './ampl-llist-ofert.component.html',
  styleUrl: './ampl-llist-ofert.component.css'
})
export class AmplLlistOfertComponent {
  @Input() oferta: Oferta | null = null;
  @Output() cambiarComponente = new EventEmitter<string>();
  esValido: boolean | null = null;

   postulacion: Postulacion = {
    idcandidato: 0,
    idoferta: 0,
    fecha: new Date(),
    estado: 'No visto',
    motivacion: ''
  };

  constructor(private cookies: CookieService, private postulacionService: PostulacionService) {}

  ngOnInit(): void {
    this.inicializarPostulacion();
    console.log(this.postulacion);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['oferta'] && this.oferta) {
      this.inicializarPostulacion();
    }
  }

  inicializarPostulacion() {
    if (this.oferta && this.oferta.idoferta){
      this.postulacion = {
        idcandidato: Number(this.cookies.get('id')),
        idoferta: this.oferta.idoferta,
        fecha: new Date(),
        estado: '',
        motivacion: ''
      };
      console.log('Postulación inicializada:', this.postulacion);
    } else {
      alert('La oferta o la empresa no están disponibles para inicializar la postulación');
    }
  }

  iraInscripcion() {
    const tipo = String(this.cookies.get('tipo'));
    if (tipo === 'candidato') {
      this.esValido = true;
    } else {
      this.esValido = false;
    }
  }

  enviarPostulacion() {
    if (!this.postulacion) {
      alert('No se pudo crear la postulación: oferta no disponible');
      return;
    }

    const idcandidato = this.postulacion.idcandidato;
    const idoferta = this.postulacion.idoferta;

    this.postulacionService.verificarPostulacion(idcandidato, idoferta).subscribe({
      next: res => {
        if (res) {
          alert('Ya estás inscrito en la oferta');
        } else {
          this.crearNuevaPostulacion();
        }
      },
      error: err => {
        if (err.status === 404) {
          this.crearNuevaPostulacion();
        } else {
          alert('Error verificando postulación: ' + (err.message || 'Error desconocido'));
        }
      }
    });
  }

  crearNuevaPostulacion() {
    this.postulacionService.crearPostulacion(this.postulacion).subscribe({
      next: res => alert('Inscripción realizada con éxito'),
      error: err => console.error('Error al enviar postulación', err)
    });
  }
}

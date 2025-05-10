import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FiltroOfertasService } from '../servicios/filtro-ofertas.service';
import { Oferta } from '../models/oferta.model';

@Component({
  selector: 'app-filtre-ofertes',
  templateUrl: './filtre-ofertes.component.html',
  styleUrl: './filtre-ofertes.component.css'
})

export class FiltreOfertesComponent implements OnInit {

  @Output() cambiarComponente = new EventEmitter<{componente: string, oferta: Oferta}>();

  irAmpList(oferta: Oferta | null) {
    if (oferta) {
      console.log('Ampliando oferta:', oferta);
      this.cambiarComponente.emit({ componente: 'ampl-llist-ofert', oferta });
    } else {
      console.log('No se puede ampliar la oferta: la oferta es null o undefined');
    }
  }

  fechas: string[] = [];
  empresas: string[] = [];
  profesiones: string[] = [];
  provincias: string[] = [];
  descripcion: string[] = [];

  filtros: any = {
    fecha: '',
    empresa: '',
    profesion: '',
    provincia: '',
    descripcion: ''
  };

  todasLasOfertas: Oferta[] = [];
  ofertasFiltradas: Oferta[] = [];

  constructor(private filtroOfertasService: FiltroOfertasService) {}

  ngOnInit(): void {
    this.cargarOfertas();
  }

  cargarOfertas() {
    this.filtroOfertasService.getOfertas({}).subscribe(ofertas => {
      this.todasLasOfertas = ofertas;
      this.ofertasFiltradas = ofertas;
      this.fechas = [...new Set(ofertas.map(oferta => oferta.fecha))];
      this.empresas = [...new Set(ofertas.map(oferta => oferta.empresa?.nombre))];
      this.profesiones = [...new Set(ofertas.map(oferta => oferta.profesion?.nombreprofesion))];
      this.provincias = [...new Set(ofertas.map(oferta => oferta.provincia?.nombreprovincia))];
      this.descripcion = [...new Set(ofertas.map(oferta => oferta.descripcion))];
    });
  }
  aplicarFiltro() {
    this.ofertasFiltradas = this.todasLasOfertas.filter(oferta =>
      (!this.filtros.fecha || oferta.fecha === this.filtros.fecha) &&
      (!this.filtros.empresa || oferta.empresa?.nombre === this.filtros.empresa) &&
      (!this.filtros.profesion || oferta.profesion?.nombreprofesion === this.filtros.profesion) &&
      (!this.filtros.provincia || oferta.provincia?.nombreprovincia === this.filtros.provincia) &&
      (!this.filtros.descripcion || oferta.descripcion === this.filtros.descripcion)
    );
  }
}

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FiltroOfertasService } from '../servicios/filtro-ofertas.service';
import { Oferta } from '../models/oferta.model';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  host: { 'ngSkipHydration': '' }
})

export class PrincipalComponent {

  ofertas: any[] = [];
  componenteActual: string = 'filtro';
  vista: string = 'filtre-ofertes';
  ofertaSeleccionada: Oferta | null = null;
  document: Document;
  isCandidato: boolean = false;
  isBrowser: boolean = false;
  tipoUsuario: string = '';

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookies: CookieService,
    private filtroOfertasService: FiltroOfertasService) {
    this.document = doc;
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const cookies = this.doc.cookie;
      if (cookies.includes('tipo=candidato')) {
        this.tipoUsuario = 'candidato';
      } else if (cookies.includes('tipo=empresa')) {
        this.tipoUsuario = 'empresa';
      }
    }
  }

cambiarVista(event: { componente: string; oferta: Oferta }) {
  this.vista = event.componente;
  this.ofertaSeleccionada = event.oferta;
}

  cambiarComponente(nuevoComponente: string) {
    this.componenteActual = nuevoComponente;
  }

  cargarOfertas(filtros: any) {
    this.filtroOfertasService.getOfertas(filtros).subscribe(ofertas => {
      this.ofertas = ofertas;
    });
  }
}

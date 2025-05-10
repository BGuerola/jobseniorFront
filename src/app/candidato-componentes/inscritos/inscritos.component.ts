import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Oferta } from '../../models/oferta.model'
import { OfertasinscritoService} from '../../servicios/ofertasinscrito.service'

@Component({
  selector: 'app-inscritos',
  templateUrl: './inscritos.component.html',
  styleUrl: './inscritos.component.css'
})
export class InscritosComponent {
  @Output() cambiarCand = new EventEmitter<string>();

  ofertasInscrito: Oferta[] = [];
  constructor(
    private ofertainscritos: OfertasinscritoService,
    private cookies: CookieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const idcandidato = Number(this.cookies.get('id'));
    if (idcandidato) {
      this.cargarOfertasInscrito(idcandidato);
    } else {
      console.error('No se encontró la cookie del candidato');
    }
  }

  cargarOfertasInscrito(idcandidato: Number): void {
    this.ofertainscritos.obtenerOfertasPorCandidato(idcandidato).subscribe({
        next: (data) => this.ofertasInscrito = data,
        error: (err) => console.error('Error al cargar las ofertas:', err)
      });
  }

irAAmpliar(idoferta: number | null)  {
  const idcandidato = Number(this.cookies.get('id'));
  console.log('irAAmpliar →', { idoferta, idcandidato });
  if (!idoferta || !idcandidato) {
    console.error('Faltan datos para navegar');
    return;
  }

  this.router.navigate(['/ampliarinscripcion', idoferta, idcandidato]);
}

}

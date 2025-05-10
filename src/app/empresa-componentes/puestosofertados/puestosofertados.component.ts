import { Component } from '@angular/core';
import { Oferta } from '../../models/oferta.model'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { OfertasinscritoService } from '../../servicios/ofertasinscrito.service';

@Component({
  selector: 'app-puestosofertados',
  templateUrl: './puestosofertados.component.html',
  styleUrl: './puestosofertados.component.css'
})
export class PuestosofertadosComponent {

  puestosofertados: Oferta[] = [];

  constructor(
    private ofertainscritos: OfertasinscritoService,
    private cookies: CookieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const idempresa = Number(this.cookies.get('id'));
    if (idempresa) {
      this.cargarOfertasInscrito(idempresa);
    } else {
      alert('No se pudo cargar las ofertas del candidato');
    }
  }

  cargarOfertasInscrito(idempresa: Number): void {
    this.ofertainscritos.obtenerOfertasPorEmpresa(idempresa).subscribe({
        next: (data) => this.puestosofertados = data,
        error: (err) => console.error('Error al cargar las ofertas:', err)
      });
  }

irAGestio(idoferta: number) {
    const idempresa = Number(this.cookies.get('id'));
    console.log({ idoferta, idempresa });
    console.log('irAGestio→', { idoferta, idempresa });
    if (!idoferta || !idempresa) {
      console.error('Faltan datos para navegar');
      return;
    }
  this.router.navigate(['/ofertesycand', idoferta]);
}
}

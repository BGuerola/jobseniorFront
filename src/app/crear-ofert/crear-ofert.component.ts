import { Component, OnInit } from '@angular/core';
import { Oferta, Profesion, Provincia } from '../models/oferta.model';
import { CookieService } from 'ngx-cookie-service';
import { OfertasinscritoService } from '../servicios/ofertasinscrito.service';
import { Empresa } from '../models/empresa.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-ofert',
  templateUrl: './crear-ofert.component.html',
  styleUrl: './crear-ofert.component.css'
})
export class CrearOfertComponent {

empresa:Empresa | null = null;
oferta: Oferta | null = null;

profesiones: Profesion[] = [];
provincias: Provincia[] = [];

  constructor(
    private cookies: CookieService,
    private router: Router,
    private location: Location,
    private ofertasService: OfertasinscritoService
  ) {}

ngOnInit(): void {
  const state = this.location.getState() as { empresa: Empresa };

  if (state && state.empresa) {
    this.empresa = state.empresa;
    this.oferta = {
      fecha: new Date().toISOString().substring(0, 10),
      empresa: this.empresa,
      profesion: { idprofesion: 0, nombreprofesion: '' },
      provincia: { idprovincia: 0, nombreprovincia: '' },
      descripcion: ''
    };

    this.profesiones = [
      { idprofesion: 1, nombreprofesion: 'Arte: Actor/actriz' },
      { idprofesion: 2, nombreprofesion: 'Arte: Diseñador/a gráfico' },
      { idprofesion: 3, nombreprofesion: 'Arte: Fotógrafo/a'},
      { idprofesion: 4, nombreprofesion: 'Arte: Fotógrafo/a profesional'},
      { idprofesion: 5, nombreprofesion: 'Arte: Ilustrador/a digital'},
      { idprofesion: 6, nombreprofesion: 'Arte: Músico/a profesional'},
      { idprofesion: 7, nombreprofesion: 'Ciencias: Biólogo/a'},
      { idprofesion: 8, nombreprofesion: 'Ciencias: Ingeniero/a ambiental'},
      { idprofesion: 9, nombreprofesion: 'Ciencias: Investigador/a en biotecnología'},
      { idprofesion: 10, nombreprofesion: 'Ciencias: Químico/a analista'},
      { idprofesion: 11, nombreprofesion: 'Ciencias:Técnico/a en laboratorio'},
      { idprofesion: 12, nombreprofesion: 'Deporte: Entrenador/a personal'},
      { idprofesion: 13, nombreprofesion: 'Ingeniería: Arquitecto/a'},
      { idprofesion: 14, nombreprofesion: 'Ingeniería: Ingeniero/a civil'},
      { idprofesion: 15, nombreprofesion: 'Ingeniería: Ingeniero/a eléctrico'},
      { idprofesion: 16, nombreprofesion: 'Ingeniería: Ingeniero/a mecánico'},
      { idprofesion: 17, nombreprofesion: 'Ingeniería: Ingeniero/a químico' },
      { idprofesion: 18, nombreprofesion: 'Negocios: Administrador/a de empresas'},
      { idprofesion: 19, nombreprofesion: 'Negocios: Administrativo/a Contable'},
      { idprofesion: 20, nombreprofesion: 'Negocios: Consultor/a financiero'},
      { idprofesion: 21, nombreprofesion: 'Negocios: Especialista en marketing'},
      { idprofesion: 22, nombreprofesion: 'Negocios: Gerente de proyect'},
      { idprofesion: 23, nombreprofesion: 'Salud: Dentista'},
      { idprofesion: 24, nombreprofesion: 'Salud: Enfermero/a'},
      { idprofesion: 25, nombreprofesion: 'Salud: Fisioterapeuta'},
      { idprofesion: 26, nombreprofesion: 'Salud: Médico general'},
      { idprofesion: 27, nombreprofesion: 'Salud: Nutricionista'},
      { idprofesion: 28, nombreprofesion: 'Salud: Optometrista'},
      { idprofesion: 29, nombreprofesion: 'Salud: Psicólogo/a clínico'},
      { idprofesion: 30, nombreprofesion: 'Salud: Veterinario/a'},
      { idprofesion: 31, nombreprofesion: 'Servicios: Abogado/a laboral'},
      { idprofesion: 32, nombreprofesion: 'Servicios: Chef de cocina'},
      { idprofesion: 33, nombreprofesion: 'Servicios: Electricista'},
      { idprofesion: 34, nombreprofesion: 'Servicios: Fontanero/a'},
      { idprofesion: 35, nombreprofesion: 'Servicios: Guardia de seguridad'},
      { idprofesion: 36, nombreprofesion: 'Servicios: Jardinero'},
      { idprofesion: 37, nombreprofesion: 'Servicios: Limpiador/a profesional'},
      { idprofesion: 38, nombreprofesion: 'Servicios: Mecánico/a de automóviles'},
      { idprofesion: 39, nombreprofesion: 'Servicios: Peluquero/a estilista'},
      { idprofesion: 40, nombreprofesion: 'Servicios: Transportista'},
      { idprofesion: 41, nombreprofesion: 'TIC: Administrador/a de sistemas'},
      { idprofesion: 42, nombreprofesion: 'TIC: Analista de datos'},
      { idprofesion: 43, nombreprofesion: 'TIC: Analista de sistemas'},
      { idprofesion: 44, nombreprofesion: 'TIC: Consultor/a en TI'},
      { idprofesion: 45, nombreprofesion: 'TIC: Desarrollador/a de aplicaciones móviles'},
      { idprofesion: 46, nombreprofesion: 'TIC: Desarrollador/a web'},
      { idprofesion: 47, nombreprofesion: 'TIC: Diseñador/a UX/UI'},
      { idprofesion: 48, nombreprofesion: 'TIC: Especialista en ciberseguridad'},
      { idprofesion: 49, nombreprofesion: 'TIC: Ingeniero/a de software'},
      { idprofesion: 50, nombreprofesion: 'TIC: Ingeniero/a en redes'},
      { idprofesion: 51, nombreprofesion: 'TIC: Programador/a'},
      { idprofesion: 52, nombreprofesion: 'TIC: Técnico/a en soporte informático'}
      ];

      this.provincias = [
        { idprovincia: 1, nombreprovincia: 'Álava' },
        { idprovincia: 2, nombreprovincia: 'Albacete' },
        { idprovincia: 3, nombreprovincia: 'Alicante' },
        { idprovincia: 4, nombreprovincia: 'Almería' },
        { idprovincia: 5, nombreprovincia: 'Asturias' },
        { idprovincia: 6, nombreprovincia: 'Ávila' },
        { idprovincia: 7, nombreprovincia: 'Badajoz' },
        { idprovincia: 8, nombreprovincia: 'Barcelona' },
        { idprovincia: 9, nombreprovincia: 'Burgos' },
        { idprovincia: 10, nombreprovincia: 'Cáceres' },
        { idprovincia: 11, nombreprovincia: 'Cádiz' },
        { idprovincia: 12, nombreprovincia: 'Cantabria' },
        { idprovincia: 13, nombreprovincia: 'Castellón' },
        { idprovincia: 14, nombreprovincia: 'Ceuta' },
        { idprovincia: 15, nombreprovincia: 'Ciudad Real' },
        { idprovincia: 16, nombreprovincia: 'Córdoba' },
        { idprovincia: 17, nombreprovincia: 'A Coruña' },
        { idprovincia: 18, nombreprovincia: 'Cuenca' },
        { idprovincia: 19, nombreprovincia: 'Girona' },
        { idprovincia: 20, nombreprovincia: 'Granada' },
        { idprovincia: 21, nombreprovincia: 'Guadalajara' },
        { idprovincia: 22, nombreprovincia: 'Gipuzkoa' },
        { idprovincia: 23, nombreprovincia: 'Huelva' },
        { idprovincia: 24, nombreprovincia: 'Huesca' },
        { idprovincia: 25, nombreprovincia: 'Illes Balears' },
        { idprovincia: 26, nombreprovincia: 'Jaén' },
        { idprovincia: 27, nombreprovincia: 'León' },
        { idprovincia: 28, nombreprovincia: 'Lleida' },
        { idprovincia: 29, nombreprovincia: 'Lugo' },
        { idprovincia: 30, nombreprovincia: 'Madrid' },
        { idprovincia: 31, nombreprovincia: 'Málaga' },
        { idprovincia: 32, nombreprovincia: 'Melilla' },
        { idprovincia: 33, nombreprovincia: 'Murcia' },
        { idprovincia: 34, nombreprovincia: 'Navarra' },
        { idprovincia: 35, nombreprovincia: 'Ourense' },
        { idprovincia: 36, nombreprovincia: 'Palencia' },
        { idprovincia: 37, nombreprovincia: 'Las Palmas' },
        { idprovincia: 38, nombreprovincia: 'Pontevedra' },
        { idprovincia: 39, nombreprovincia: 'La Rioja' },
        { idprovincia: 40, nombreprovincia: 'Salamanca' },
        { idprovincia: 41, nombreprovincia: 'Santa Cruz de Tenerife' },
        { idprovincia: 42, nombreprovincia: 'Segovia' },
        { idprovincia: 43, nombreprovincia: 'Sevilla' },
        { idprovincia: 44, nombreprovincia: 'Soria' },
        { idprovincia: 45, nombreprovincia: 'Tarragona' },
        { idprovincia: 46, nombreprovincia: 'Teruel' },
        { idprovincia: 47, nombreprovincia: 'Toledo' },
        { idprovincia: 48, nombreprovincia: 'Valencia' },
        { idprovincia: 49, nombreprovincia: 'Valladolid' },
        { idprovincia: 50, nombreprovincia: 'Bizkaia' },
        { idprovincia: 51, nombreprovincia: 'Zamora' },
        { idprovincia: 52, nombreprovincia: 'Zaragoza' }
      ];


  } else {
    console.error('No se recibió la empresa');
  }
}

guardarOferta(): void {
  if (this.oferta) {
    if (this.oferta.profesion.idprofesion) {
      this.oferta.profesion.idprofesion = Number(this.oferta.profesion.idprofesion);
    }
    if (this.oferta.provincia.idprovincia) {
      this.oferta.provincia.idprovincia = Number(this.oferta.provincia.idprovincia);
    }

    this.ofertasService.crearOferta(this.oferta).subscribe({
      next: (data) => {
        alert('Oferta creada correctamente');
        this.router.navigate(['/emp']);
      },
      error: (err) => {
        alert('Hubo un error al crear la oferta');
      }
    });
  }
}
}

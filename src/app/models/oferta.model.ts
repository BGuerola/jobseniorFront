export interface Empresa {
  idempresa: number;
  nombre: string;
}

export interface Profesion {
  idprofesion: number;
  nombreprofesion: string;
}

export interface Provincia {
  idprovincia: number;
  nombreprovincia: string;
}

export interface Oferta {
  idoferta?: number;
  fecha: string;
  empresa: Empresa;
  profesion: Profesion;
  provincia: Provincia;
  descripcion: string;
}

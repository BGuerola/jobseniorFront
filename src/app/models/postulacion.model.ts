export interface Postulacion {
      id?: number;
      idcandidato: number;
      idoferta: number;
      estado?: string | null;
      fecha?: Date;
      motivacion: string | null;
}

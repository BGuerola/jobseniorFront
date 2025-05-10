import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../../servicios/empresa.service';
import { CookieService } from 'ngx-cookie-service';
import { Empresa } from '../../models/empresa.model';

@Component({
  selector: 'app-descri-emp',
  templateUrl: './descri-emp.component.html',
  styleUrl: './descri-emp.component.css'
})
export class DescriEmpComponent implements OnInit{
  empresa : Empresa = {
  idempresa: 0,
  nombre: '',
  url: '',
  direccion: '',
  descripcion: ''
  }

  constructor(
    private router: Router,
    public empresaService: EmpresaService,
    private cookies: CookieService) {}

  ngOnInit(): void {
    const id = Number(this.cookies.get('id')); // <-- Aquí lees el ID de la cookie

    if (!isNaN(id)) {
      this.empresaService.getEmpresaById(id).subscribe({
        next: (data) => this.empresa = data,
        error: (err) => console.error('Error al obtener la empresa:', err)
      });
    } else {
      console.warn('ID inválido en la cookie');
    }
  }

  guardar(): void {
    const id = Number(this.cookies.get('id')); // Lee el ID como lo haces ahora
    this.empresaService.updateEmpresa(id, this.empresa).subscribe(() => {
      alert('Empresa actualizada correctamente');
    });
  }
  crearoferta(empresa:Empresa): void {
    this.router.navigate(['/crearoferta'], { state: { empresa: this.empresa } });
  }

}

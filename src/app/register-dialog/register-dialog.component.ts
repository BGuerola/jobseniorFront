import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
import { CookieService } from 'ngx-cookie-service';
import { CandidatoService } from '../servicios/candidato.service';
import { EmpresaService } from '../servicios/empresa.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent {
  username = '';
  password = '';
  confirmPassword = '';
  type = '';

  errorMessage: string | null = null;

  constructor(
    private router: Router,
    public loginService: LoginService,
    private cookies: CookieService,
    public candidatoService: CandidatoService,
    public empresaService: EmpresaService) {}

  register() {
    const user = { nombre: this.username, contrasena: this.password, tipo: this.type };
    this.loginService.register(user).subscribe({
      next: (response: any) => {
        this.errorMessage = null;
        alert("te has registrado correctamente");
        this.loginService.setLoginCookies(response.tipo, response.id);
        const id = Number(this.cookies.get('id'));
        const tipo = String(this.cookies.get('tipo'));
        if (tipo === 'candidato') {
          this.comprobarCandidato(id);
        } else {
          this.comprobarEmpresa(id);
        }
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.error && err.error.error) {
          this.errorMessage = err.error.error;
        } else {
          this.errorMessage = 'Error desconocido al registrar';
        }
      }
    });
  }

  comprobarCandidato(id: number) {
    this.candidatoService.comprobarExistenciaCandidato(id).subscribe({
      next: (existe: boolean) => {
        console.log('¿Existe candidato?', existe);
        if (!existe) {
          this.candidatoService.createCandidato(id).subscribe({
            next: (nuevoCandidato) => {
              console.log('Candidato creado:', nuevoCandidato);
            },
            error: (error) => {
              console.error('Error creando candidato:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error comprobando existencia:', error);
      }
    });
  }
  comprobarEmpresa(id: number) {
    this.empresaService.comprobarExistenciaEmpresa(id).subscribe({
      next: (existe: boolean) => {
        if (!existe) {
          this.empresaService.createEmpresa(id).subscribe({
            next: (nuevaEmpresa) => {
              console.log('Empresa creada:', nuevaEmpresa);
            },
            error: (error) => {
              console.error('Error creando empresa:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error comprobando existencia:', error);
      }
    });
  }
}

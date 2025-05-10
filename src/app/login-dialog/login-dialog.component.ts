  import { Component, Output, EventEmitter } from '@angular/core';
  import { Router } from '@angular/router';
  import { LoginService } from '../servicios/login.service';

  @Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.css']
  })
  export class LoginDialogComponent {
    username = '';
    password = '';
    type = '';

    errorMessage: string | null = null;


    constructor(private router: Router, public loginService: LoginService) {}
    close(): void {
      window.close();
    }

    login() {
      const user = { nombre: this.username, contrasena: this.password };
      this.loginService.login(user).subscribe({
        next:(response: any) => {
          this.errorMessage = null;
          alert("te has logueado correctamente");
          this.loginService.setLoginCookies(response.tipo, response.id);
          this.router.navigate(['/']);
        },
        error:(error) => {
          console.error('Error de login:', error.error);
          this.errorMessage = 'Regístrate primero para poder loguearte. ¡Gracias!';
        }
      });
    }
  }

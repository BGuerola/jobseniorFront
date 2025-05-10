import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showDialog = false;

  constructor(private router: Router, public loginService: LoginService) {}

  openDialog(): void {
    this.router.navigate(['login-dialog']);
  }

  openRegisterDialog(): void {
    this.router.navigate(['register-dialog']);
  }

  borrarSesion(): void {
    this.loginService.clearLoginCookies();
  }
}


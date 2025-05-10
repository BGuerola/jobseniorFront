import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { HeaderComponent } from './header/header.component';
import { FiltreOfertesComponent } from './filtre-ofertes/filtre-ofertes.component';
import { EmpresaComponent } from './empresa-componentes/empresa/empresa.component';
import { CandidatComponent } from './candidato-componentes/candidat/candidat.component';
import { PrincipalComponent } from './principal/principal.component';
import { CVComponent } from './candidato-componentes/cv/cv.component';
import { InscritosComponent } from './candidato-componentes/inscritos/inscritos.component';
import { AmplLlistOfertComponent } from './ampl-llist-ofert/ampl-llist-ofert.component';
import { DescriEmpComponent } from './empresa-componentes/descri-emp/descri-emp.component';
import { CrearOfertComponent } from './crear-ofert/crear-ofert.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AmplOfertCandComponent } from './candidato-componentes/ampl-ofert-cand/ampl-ofert-cand.component';
import { CookieService } from "ngx-cookie-service";
import { PuestosofertadosComponent } from './empresa-componentes/puestosofertados/puestosofertados.component';
import { OfertasycandComponent } from './empresa-componentes/ofertasycand/ofertasycand.component';
import { PostuladoComponent } from './empresa-componentes/postulado/postulado.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    FiltreOfertesComponent,
    EmpresaComponent,
    CandidatComponent,
    PrincipalComponent,
    CVComponent,
    InscritosComponent,
    AmplLlistOfertComponent,
    DescriEmpComponent,
    CrearOfertComponent,
    AmplOfertCandComponent,
    PuestosofertadosComponent,
    OfertasycandComponent,
    PostuladoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

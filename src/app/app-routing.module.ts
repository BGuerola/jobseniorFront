import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { CandidatComponent } from './candidato-componentes/candidat/candidat.component';
import { EmpresaComponent } from './empresa-componentes/empresa/empresa.component';
import { PrincipalComponent } from './principal/principal.component';
import { InscritosComponent } from './candidato-componentes/inscritos/inscritos.component';
import { AmplLlistOfertComponent } from './ampl-llist-ofert/ampl-llist-ofert.component';
import { AmplOfertCandComponent } from './candidato-componentes/ampl-ofert-cand/ampl-ofert-cand.component';
import { CrearOfertComponent } from './crear-ofert/crear-ofert.component';
import { OfertasycandComponent } from './empresa-componentes/ofertasycand/ofertasycand.component';
import { PostuladoComponent } from './empresa-componentes/postulado/postulado.component';


const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'login-dialog', component: LoginDialogComponent },
  { path: 'register-dialog', component: RegisterDialogComponent },
  { path: 'cand', component: CandidatComponent},
  { path: 'emp', component: EmpresaComponent },
  { path: 'insc',component: InscritosComponent},
  { path: 'ampl-llist-ofert', component: AmplLlistOfertComponent },
  { path: 'ampl-ofert-cand', component: AmplOfertCandComponent },
  { path: 'ampliarinscripcion/:idoferta/:idcandidato', component: AmplOfertCandComponent },
  { path: 'crearoferta', component: CrearOfertComponent},
  { path: 'ofertesycand/:idoferta', component: OfertasycandComponent },
  { path: 'postulado/:idoferta/:idcandidato', component: PostuladoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

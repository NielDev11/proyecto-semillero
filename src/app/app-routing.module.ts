import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
import { TableComponent } from './component/table/table.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ModuloNivelComponent } from './modulos/modulo-nivel/modulo-nivel.component';
import { ModuloCargoComponent } from './modulos/modulo-cargo/modulo-cargo.component';
import { ModuloTipoEvaluacionComponent } from './modulos/modulo-tipo-evaluacion/modulo-tipo-evaluacion.component'; 



const routes: Routes = [
  {path:'',redirectTo: '/login', pathMatch: 'full'},
  {path:'principal',component:CardComponent},
  {path:'table',component:TableComponent},
  {path:'login',component:LoginComponent, data: {title: "Inicio de sessión"}},
  {path:'menubar',component:MenubarComponent},
  {path:'register',component:RegisterComponent},
  {path:'modulo_nivel',component:ModuloNivelComponent},
  {path:'modulo_cargo',component:ModuloCargoComponent},
  {path:'modulo_tipoevaluacion',component:ModuloTipoEvaluacionComponent},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

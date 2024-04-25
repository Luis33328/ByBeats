import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../authentication/guard/auth.guard';

import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from '../authentication/login/login.component';
import { ForgotComponent } from '../authentication/forgot/component/forgot.component';


import { PesquisarPAutorizadaComponent } from '../pages/autorizados/components/pesquisar/pesquisar.component';
import { CadastrarPAutorizadaComponent } from '../pages/autorizados/components/cadastrar/cadastrar.component';

import { CadastrarUsuarioComponent } from '../pages/usuario/components/cadastrar/cadastrar.component';
import { PesquisarUsuarioComponent } from '../pages/usuario/components/pesquisar/pesquisar.component';
import { HomeComponent } from '../pages/home/components/home.component';
import { SignInComponent } from '../authentication/signIn/component/signIn.component';
import { AdminGuard } from '../authentication/guard/admin.guard';
import { CadastrarBeatComponent } from '../pages/beats/components/cadastrar/cadastrar.component';
import { PesquisarBeatComponent } from '../pages/beats/components/pesquisar/pesquisar.component';
import { VisualizarBeatComponent } from '../pages/beats/components/visualizar/visualizar.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: SignInComponent },
  { path: 'forgotPassword', component: ForgotComponent },
  
  
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'beats/catalog', component: PesquisarBeatComponent },
      { path: 'beat/:id', component: VisualizarBeatComponent }
    ]
  },
  /*{
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  }*/
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'beats/register', component: CadastrarBeatComponent },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

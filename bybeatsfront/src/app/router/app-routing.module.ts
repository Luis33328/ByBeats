import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../authentication/guard/auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from '../authentication/login/login.component';
import { ForgotComponent } from '../authentication/forgot/component/forgot.component';
import { PerfilComponent } from '../pages/usuario/components/perfil/perfil.component';
import { HomeComponent } from '../pages/home/components/home.component';
import { SignInComponent } from '../authentication/signIn/component/signIn.component';
import { AdminGuard } from '../authentication/guard/admin.guard';
import { CadastrarBeatComponent } from '../pages/beats/components/cadastrar/cadastrar.component';
import { PesquisarBeatComponent } from '../pages/beats/components/pesquisar/pesquisar.component';
import { VisualizarBeatComponent } from '../pages/beats/components/visualizar/visualizar.component';
import { MeusBeatsComponent } from '../pages/beats/components/cadastrados/meus-beats.component';
import { FavoritosComponent } from '../pages/beats/components/favoritos/favoritos.component';
import { EditarPerfilComponent } from '../pages/usuario/components/editar-perfil/editar-perfil.component';
import { PlayerComponent } from '../player/player.component';
import { RecoverPasswordComponent } from '../authentication/recover-password/recover-password.component';
import { PreCheckoutComponent } from '../pages/beats/components/pre-checkout/pre-checkout.component';
import { SellerDashboardComponent } from '../sellerDashboard/sellerDashboard.component';
import { LicenciamentoComponent } from '../pages/licenciamento/licenciamento.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: SignInComponent },
  { path: 'forgotPassword', component: ForgotComponent },
  { path: 'recover-password', component: RecoverPasswordComponent }, 
  { path: 'player', component: PlayerComponent },
  { path: 'dashboard', component: SellerDashboardComponent},
  { path: 'licenciamento', component: LicenciamentoComponent},
  
  
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'beats/catalog', component: PesquisarBeatComponent },
      { path: 'beat/:id', component: VisualizarBeatComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'beats/my-tracks', component: MeusBeatsComponent },
      { path: 'beats/register/:id', component: CadastrarBeatComponent },
      { path: 'user/profile', component: PerfilComponent },
      { path: 'user/edit-profile', component: EditarPerfilComponent },
      { path: 'beats/favoritos', component: FavoritosComponent },
      { path: 'cart-checkout', component: PreCheckoutComponent },

    ]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    children: [
      
      
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

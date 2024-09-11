import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignInComponent } from './authentication/signIn/component/signIn.component';
import { ForgotComponent } from './authentication/forgot/component/forgot.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './authentication/guard/auth.guard';
import { AdminGuard } from './authentication/guard/admin.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './authentication/interceptor/auth.interceptor';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatSortModule, MatTableModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatSliderModule, MatDatepickerModule, MatNativeDateModule, DateAdapter } from '@angular/material';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { DatePipe } from '@angular/common';
import {NgxTinySliderModule} from 'ngx-tiny-slider';


import { NgxMaskModule } from 'ngx-mask';
import { NgxLoadingModule } from 'ngx-loading';

import { HomeComponent } from './pages/home/components/home.component';

import { CadastrarBeatComponent } from './pages/beats/components/cadastrar/cadastrar.component';
import { PesquisarBeatComponent } from './pages/beats/components/pesquisar/pesquisar.component';
import { VisualizarBeatComponent } from './pages/beats/components/visualizar/visualizar.component';
import { MeusBeatsComponent } from './pages/beats/components/cadastrados/meus-beats.component';

import { PerfilComponent } from './pages/usuario/components/perfil/perfil.component';

import { EditarPerfilComponent } from './pages/usuario/components/editar-perfil/editar-perfil.component';

import { FavoritosComponent } from './pages/beats/components/favoritos/favoritos.component';

import { PlayerComponent } from './player/player.component';

import { RecoverPasswordComponent } from './authentication/recover-password/recover-password.component';

import { PreCheckoutComponent } from './pages/beats/components/pre-checkout/pre-checkout.component';
import { CustomDateAdapter } from './common/dateadapter.utils';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,

    LoginComponent,
    SignInComponent,
    ForgotComponent,

    NavbarComponent,
    
    HomeComponent,

    CadastrarBeatComponent,
    PesquisarBeatComponent,
    VisualizarBeatComponent,
    MeusBeatsComponent,
    PerfilComponent,
    FavoritosComponent,
    EditarPerfilComponent,
    PlayerComponent,
    RecoverPasswordComponent,
    PreCheckoutComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    NgMaterialMultilevelMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatSliderModule,
    MatPaginatorModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSortModule,
    MatDialogModule,
    NgMatSearchBarModule,
    NgxTinySliderModule,
    MatMenuModule,
    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,        // <----- import for date formating(optional)
    NgxLoadingModule.forRoot({}),
    NgxMaskModule.forRoot()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  // ... existing code ...

  providers: [ 
    DatePipe,
    AuthGuard, 
    AdminGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: { parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } }, display: { dateInput: 'input', monthYearLabel: { year: 'numeric', month: 'short' }, dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' }, monthYearA11yLabel: { year: 'numeric', month: 'long' } } } },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // change this to your locale
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


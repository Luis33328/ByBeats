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
import { MatAutocompleteModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatSortModule, MatTableModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';

import {NgxTinySliderModule} from 'ngx-tiny-slider';


import { NgxMaskModule } from 'ngx-mask';
import { NgxLoadingModule } from 'ngx-loading';

import { HomeComponent } from './pages/home/components/home.component';

import { CadastrarBeatComponent } from './pages/beats/components/cadastrar/cadastrar.component';
import { PesquisarBeatComponent } from './pages/beats/components/pesquisar/pesquisar.component';
import { VisualizarBeatComponent } from './pages/beats/components/visualizar/visualizar.component';
import { MeusBeatsComponent } from './pages/beats/components/cadastrados/meus-beats.component';


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
    MeusBeatsComponent

  ],
  entryComponents: [
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule ,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    NgMaterialMultilevelMenuModule,
    MatToolbarModule,
    MatTableModule,
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
    NgxLoadingModule.forRoot({}),
    NgxMaskModule.forRoot()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [AuthGuard, AdminGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }],

  bootstrap: [AppComponent]
})
export class AppModule { }


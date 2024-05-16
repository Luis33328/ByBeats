import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import { GenericFilter } from 'src/app/common/generic.filter';
import { UsuarioService } from '../../service/usuario.service';
import { SignIn } from 'src/app/authentication/signIn/model/signIn.model';
import { BeatService } from 'src/app/pages/beats/service/beat.service';
import { SignInService } from 'src/app/authentication/signIn/service/signIn.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {

//  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public beats = [];

  public user = "";
  userModel:SignIn;

  constructor(
    private usuarioService: SignInService,
    private beatService: BeatService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.getLogged();
  }

  /*public load(pageIndex: Number) {
    this.usuarioService.list(new GenericFilter(pageIndex, 10)).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.pageLength = data.totalElements;
      this.dataSource.sort = this.sort;
    }, err => {
      this.snackBar.open('Não foi possível realizar a busca.', 'Fechar');
    });
  }*/

  private getBeats(){
    
    this.beatService.getMeusBeats(this.userModel).subscribe(data => {
      this.beats = data;
      console.log(data);
    }, err => {
      console.log(err)
      console.log("List Error.")
    });
  }

  private getLogged() {
    this.usuarioService.getByUsername().subscribe(data => {
      this.user = data.login;
      this.userModel = data;
      console.log(this.userModel)
      this.getBeats()

    }, err => {
      console.log("eero");
    });
  }

  public view(event) {
    this.router.navigate(['/beat/' + event]);
  }


  public getId(row) {
    console.log(row);
    this.view(row.guidBeat);
  }

}

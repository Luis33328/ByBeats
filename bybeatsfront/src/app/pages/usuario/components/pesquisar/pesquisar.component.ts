import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { ConverterUtils } from 'src/app/common/converter.utils';
import { GenericFilter } from 'src/app/common/generic.filter';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-pesquisar-usuario',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css'],
  providers: [UsuarioService]
})
export class PesquisarUsuarioComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns: string[] = ['id', 'login', 'matricula', 'perfil', 'status'];
  public dataSource = new MatTableDataSource([]);
  public pageSizeOptions: number[] = [10];
  public pageLength = 0;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.load(1);
  }

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public catchEventMatPaginator(event?: PageEvent) {
    this.load(event.pageIndex);
  }

  public load(pageIndex: Number) {
    this.usuarioService.list(new GenericFilter(pageIndex, 10)).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.pageLength = data.totalElements;
      this.dataSource.sort = this.sort;
    }, err => {
      this.snackBar.open('Não foi possível realizar a busca.', 'Fechar');
    });
  }

  public cadastrar(event) {
    this.router.navigate(['/usuario/cadastrar/' + event]);
  }

  public converterDataFront(data) {
    return ConverterUtils.convertDateBackendToFrontend(data);
  }

  public editar(row) {
    this.cadastrar(row.guidUsuario);
  }

}

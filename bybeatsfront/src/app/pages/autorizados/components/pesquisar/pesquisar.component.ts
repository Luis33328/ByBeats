import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { GenericFilter } from 'src/app/common/generic.filter';
import { PAutorizadaService } from '../../service/autorizados.service';

@Component({
  selector: 'app-pesquisar-PA',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css'],
  providers: [PAutorizadaService]
})
export class PesquisarPAutorizadaComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'nome', 'cpf', 'motorista' , 'inativo'];
  public dataSource = new MatTableDataSource([]);
  public pageSizeOptions: number[] = [10];
  public pageLength = 0;

  constructor(
    private pAutorizadaService: PAutorizadaService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.load(1);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public catchEventMatPaginator(event?: PageEvent) {
    this.load(event.pageIndex);
  }

  public load(pageIndex: Number) {
    this.pAutorizadaService.list(new GenericFilter(pageIndex, 10)).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.pageLength = data.totalElements;
      console.log(data);
    }, err => {
      this.snackBar.open('Não foi possível realizar a busca.', 'Fechar');
    });
  }

  public cadastrar(event) {
    this.router.navigate(['/PA/cadastrar/' + event]);
  }

  public editar(row) {
    this.cadastrar(row.guidPA);
  }

}

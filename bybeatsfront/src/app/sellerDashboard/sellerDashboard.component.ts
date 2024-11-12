import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SignIn } from 'src/app/authentication/signIn/model/signIn.model';
import { BeatService } from '../pages/beats/service/beat.service';
import { SignInService } from '../authentication/signIn/service/signIn.service';
import { Beat } from '../pages/beats/model/beat.model';

interface Compra {
  guidCompra: string;
  beat: Beat;
  licenca: string;
  pedido: {
    total: string;
    dataPedido: Date;
  };
}

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './sellerDashboard.component.html',
  styleUrls: ['./sellerDashboard.component.scss'],
})
export class SellerDashboardComponent implements OnInit {
  constructor(private beatService: BeatService, private usuarioService: SignInService) {}

  beatCount = 0;
  userModel: SignIn;
  priceMean: any = 0;
  beats: Beat[] = [];
  compras: Compra[] = [];
  avgPrecoBasic = 0;
  avgPrecoPremium = 0;
  avgPrecoUnlimited = 0;
  MediaPrecosPieChartData: number[] = [];

  lineChartData: ChartDataSets[] = [{ data: [], label: 'Sales' }];
  lineChartLabels: Label[] = [];
  lineChartOptions: ChartOptions = { responsive: true };
  lineChartColors: Color[] = [{ borderColor: 'blue' }];
  lineChartLegend = true;
  lineChartType: ChartType = 'line';

  barChartData: ChartDataSets[] = [{ data: [], label: 'Revenue' }];
  barChartLabels: Label[] = [];
  barChartOptions: ChartOptions = { responsive: true };
  barChartLegend = true;
  barChartType: ChartType = 'bar';

  pieChartData: number[] = [];
  pieChartLabels: Label[] = [];
  pieChartType: ChartType = 'pie';

  MediaPrecosPieChartLabels: Label[] = ['Basic', 'Premium', 'Unlimited'];
  MediaPrecosPieChartType: ChartType = 'pie';
  MediaPrecosPieChartColors: Color[] = [{
    backgroundColor: ['#A9A9A9', '#808080', '#FF6961', '#A9A9A9', '#808080', '#FF6961', '#A9A9A9', '#808080', '#FF6961', '#A9A9A9']
  }];

  filter = {
    startDate: null,
    endDate: null,
    beat: null,
  };
  beatsFilter: string[] = [];

  getBeats() {
    this.beatService.getMeusBeats(this.userModel).subscribe((data: Beat[]) => {
      this.beats = data;
      this.beatCount = data.length;

      if (this.beatCount > 0) {
        this.avgPrecoBasic = this.beats.reduce((sum, beat) => sum + parseFloat(beat.precoBasic as string), 0) / this.beatCount;
        this.avgPrecoPremium = this.beats.reduce((sum, beat) => sum + parseFloat(beat.precoPremium as string), 0) / this.beatCount;
        this.avgPrecoUnlimited = this.beats.reduce((sum, beat) => sum + parseFloat(beat.precoUnlimited as string), 0) / this.beatCount;
      } else {
        this.avgPrecoBasic = 0;
        this.avgPrecoPremium = 0;
        this.avgPrecoUnlimited = 0;
      }

      this.MediaPrecosPieChartData = [this.avgPrecoBasic, this.avgPrecoPremium, this.avgPrecoUnlimited];
      this.beatsFilter = this.beats.map(beat => beat.titulo.toString());
      this.getCompras();
    }, err => {
      console.error(err);
      console.error('List Error.');
    });
  }

  getCompras() {
    this.beatService.getCompras(this.userModel).subscribe((data: Compra[]) => {
      this.compras = data.filter(compra => this.beats.some(beat => beat.guidBeat.toString() === compra.beat.guidBeat.toString()))
        .map(compra => ({ ...compra, pedido: { ...compra.pedido, dataPedido: new Date(compra.pedido.dataPedido) } }));
      this.applyFilters();
    }, err => {
      console.error(err);
    });
  }

  applyFilters() {
    const filteredCompras = this.compras.filter(compra => {
      const date = compra.pedido.dataPedido;
      return (!this.filter.startDate || date >= this.filter.startDate) &&
             (!this.filter.endDate || date <= this.filter.endDate) &&
             (!this.filter.beat || compra.beat.titulo.toString() === this.filter.beat);
    });
    this.updateCharts(filteredCompras);
  }

  updateCharts(filteredCompras: Compra[]) {
    const salesByMonth: { [month: string]: number } = {};
    const licensesByMonth: { [month: string]: number } = {}; 

    filteredCompras.forEach(compra => {
      const month = compra.pedido.dataPedido.toLocaleString('default', { month: 'long' });
      salesByMonth[month] = (salesByMonth[month] || 0) + 1;
      licensesByMonth[month] = (licensesByMonth[month] || 0) + parseInt(compra.licenca); 
    });

    this.lineChartData = [{ data: Object.values(salesByMonth), label: 'Sales' }];
    this.lineChartLabels = Object.keys(salesByMonth);

    this.barChartData = [{ data: Object.values(licensesByMonth), label: 'Licenses Sold' }]; 
    this.barChartLabels = Object.keys(licensesByMonth);

    const licensesByBeat: { [guidBeat: string]: number } = {}; 
    filteredCompras.forEach(compra => {
      const guidBeat = compra.beat.guidBeat.toString();
      licensesByBeat[guidBeat] = (licensesByBeat[guidBeat] || 0) + parseInt(compra.licenca);
    });

    this.pieChartData = Object.values(licensesByBeat);
    this.pieChartLabels = Object.keys(licensesByBeat).map(guid => {
      const beat = this.beats.find(b => b.guidBeat.toString() === guid);
      return beat ? beat.titulo.toString() : guid;
    });
  }

  clearFilters() {
    this.filter = { startDate: null, endDate: null, beat: null };
    this.applyFilters();
  }

  private getLogged() {
    this.usuarioService.getByUsername().subscribe(data => {
      this.userModel = data;
      this.getBeats();
    }, err => {
      console.error(err);
    });
  }

  ngOnInit() {
    this.getLogged();
  }

  onChartClick(event: any) {}
}
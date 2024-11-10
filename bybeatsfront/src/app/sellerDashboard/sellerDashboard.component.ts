import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './sellerDashboard.component.html',
  styleUrls: ['./sellerDashboard.component.scss']
})
export class SellerDashboardComponent {

  filter = {
    startDate: null,
    endDate: null,
    beat: null 
  };

  beats = ['Beat A', 'Beat B', 'Beat C']; 

  originalData = [
    { date: new Date('2024-01-15'), sales: 65, revenue: 28, beat: 'Beat A' },
    { date: new Date('2024-02-20'), sales: 59, revenue: 48, beat: 'Beat B' },
    { date: new Date('2024-03-10'), sales: 80, revenue: 40, beat: 'Beat C' },
    { date: new Date('2024-04-25'), sales: 81, revenue: 19, beat: 'Beat A' },
    { date: new Date('2024-05-05'), sales: 56, revenue: 86, beat: 'Beat B' },
    { date: new Date('2024-06-18'), sales: 55, revenue: 27, beat: 'Beat A' },
    { date: new Date('2024-07-22'), sales: 40, revenue: 90, beat: 'Beat C' }
  ];

  filteredData = [...this.originalData];


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
  pieChartColors: Color[] = [
    {
      backgroundColor: [
        '#FF5733', '#3498DB', '#FFC300', '#27AE60', '#8E44AD', 
        '#E74C3C', '#1ABC9C', '#F39C12', '#2980B9', '#9B59B6' 
      ]
    }
  ];


  applyFilters() {
    this.filteredData = this.originalData.filter(item => {
      const date = item.date;
      return (
        (!this.filter.startDate || date >= this.filter.startDate) &&
        (!this.filter.endDate || date <= this.filter.endDate) &&
        (!this.filter.beat || item.beat === this.filter.beat)
      );
    });

    this.updateCharts();
  }

  clearFilters() {
    this.filter = {
      startDate: null,
      endDate: null,
      beat: null
    };
    this.applyFilters(); 
  }

  updateCharts() {

    this.lineChartData = [{
      data: this.filteredData.map(item => item.sales),
      label: 'Sales'
    }];
    this.lineChartLabels = this.filteredData.map(item =>
      item.date.toLocaleString('default', { month: 'long' })
    );


    this.barChartData = [{
      data: this.filteredData.map(item => item.revenue),
      label: 'Revenue'
    }];
    this.barChartLabels = this.filteredData.map(item =>
      item.date.toLocaleString('default', { month: 'long' })
    );

    const beatRevenue = this.filteredData.reduce((acc, item) => {
      acc[item.beat] = (acc[item.beat] || 0) + item.revenue;
      return acc;
    }, {} as { [key: string]: number });

    this.pieChartData = Object.values(beatRevenue);
    this.pieChartLabels = Object.keys(beatRevenue);
  }



  ngOnInit() {
    this.updateCharts();
  }


  onChartClick(event: any): void {
    console.log(event);
  }
}
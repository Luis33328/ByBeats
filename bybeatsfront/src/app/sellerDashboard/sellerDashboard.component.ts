import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './sellerDashboard.component.html',
  styleUrls: ['./sellerDashboard.component.scss']
})
export class SellerDashboardComponent {
  // Line chart data and options
  public lineChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales' }
  ];
  public lineChartLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
  public lineChartOptions = {
    responsive: true,
    hover: {
      mode: 'nearest',
      intersect: true
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            label += ': ';
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label;
        }
      }
    }
  };
  public lineChartLegend = true;
  public lineChartType = 'line';

  // Bar chart data and options
  public barChartData = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Revenue' }
  ];
  public barChartLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
  public barChartOptions = {
    responsive: true,
    hover: {
      mode: 'nearest',
      intersect: true
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            label += ': ';
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label;
        }
      }
    }
  };
  public barChartLegend = true;
  public barChartType = 'bar';

  public pieChartData = [300, 500, 100];
  public pieChartLabels = ['Beat A', 'Beat B', 'Beat C'];
  public pieChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      borderColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'] 
    }
  ];

  onChartClick(event: any): void {
    console.log(event);
  }
}
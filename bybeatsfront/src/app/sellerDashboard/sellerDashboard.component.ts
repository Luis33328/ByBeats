import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './sellerDashboard.component.html',
  styleUrls: ['./sellerDashboard.component.scss']
})
export class SellerDashboardComponent {
  public lineChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales' }
  ];
  public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
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

  // Click event handler
  onChartClick(event: any): void {
    console.log(event);
    // Handle the click event here
  }
}
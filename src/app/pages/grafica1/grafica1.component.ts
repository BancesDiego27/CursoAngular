import { Component } from '@angular/core';
import { ChartData} from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  public doughnutChartLabels: string[] = [
    'Download Sales2',
    'In-Store Sales2',
    'Mail-Order Sales2',
  ];
  public info: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [100, 200, 300] ,
        backgroundColor : ["#FFFFF","#009FEE","#F02059"]},
    ],
  };


  
}

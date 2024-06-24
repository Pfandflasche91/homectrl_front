import { Component, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'hc-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  @ViewChild("chart", {static: false}) chart!: ChartComponent
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
  }

}


this.service.getAlltemp().subscribe(temperature =>{this.temperature = temperature;}, );
this.service.getAllhum().subscribe(humidity =>{this.humidity = humidity});




<apx-chart #chart [chart]="{
  type: 'line',
  height: 20,
  background: '#696868',
  sparkline: {
      enabled: true
  }
}" [colors]="['#f2f2f2']" [markers]="{
  size: 0
}" [series]="chartOptions.series" [stroke]="{
      color: '#4191ff',
      width: 1
}" [xaxis]="{
  crosshairs: {
      width: 0
  }
}" [yaxis]="{
  min: 0
}" ></apx-chart></code>

<apx-chart [chart]="{
  type: 'line',
  height: 20,
  background: '#696868',
  sparkline: {
      enabled: true
  }
}" [colors]="['#f2f2f2']" [markers]="{
  size: 0
}" [series]="chartOptions.series" [stroke]="{
      color: '#4191ff',
      width: 1
}" [xaxis]="{
  crosshairs: {
      width: 0
  }
}" [yaxis]="{
  min: 0
}" ></apx-chart>

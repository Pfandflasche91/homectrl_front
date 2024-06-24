import { Component, OnInit, ViewChild} from "@angular/core";
import { Temperature } from '../shared/temperature';
import { Humidity } from "../shared/humidity";
import { DbDhtdataService } from '../services/db-dhtdata.service';

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
  selector: 'hc-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})

export class StatisticsComponent {
  @ViewChild("chart", {static: false}) chart!: ChartComponent
  public chartOptions: Partial<ChartOptions>;

  temperature: Temperature[] = [];
  humidity: Humidity[] = [];
  temp_length: number = 0;

  constructor(private service: DbDhtdataService){

    this.chartOptions = {
      series: [
        {
          name: "Temperature",
          data: []
        },
        {
          name: "Humidity",
          data: []
        }

      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {

      }
    };

    this.service.getAlltemp().subscribe(temperature =>{this.temperature = temperature;}, );
    this.service.getAllhum().subscribe(humidity =>{this.humidity = humidity});

  }

  fetchDataAndRenderChart() {

    }




  refreshData() {
    this.service.getAlltemp().subscribe(temperature =>{this.temperature = temperature;}, );
    this.service.getAllhum().subscribe(humidity =>{this.humidity = humidity});
    this.fetchDataAndRenderChart()
  }
}








import { Component, OnInit, ViewChild} from "@angular/core";
import { DbDhtdataService } from '../services/db-dhtdata.service';
import { FormControl, FormGroup } from '@angular/forms';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { Hygrometer } from "../shared/hygrometer";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis | ApexYAxis[];
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'hc-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})

export class StatisticsComponent {
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  @ViewChild("chart", {static: false}) chart!: ChartComponent
  public chartOptions: Partial<ChartOptions>;


  temp_length: number = 0;
  hygrometerData: Hygrometer[] = [];

  constructor(private dbDHTservice: DbDhtdataService){

    this.chartOptions = {
      series: [
        {
          data: [1,2,3]
        }

      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {

      },
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            style: {

            }
          },
          title: {
            text: "Income (thousand crores)",
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: "Income",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {

            }
          },
          title: {
            text: "Operating Cashflow (thousand crores)",
            style: {
              color: "#00E396"
            }
          }
        },
        {
          seriesName: "Revenue",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#FEB019"
          },
          labels: {
            style: {

            }
          },
          title: {
            text: "Revenue (thousand crores)",
            style: {
              color: "#FEB019"
            }
          }
        }
      ],



    };


  }

  fetchDataAndRenderChart() {
    this.refreshData()
  }

  refreshData() {
    var data = this.randData();
    this.chart.updateSeries([{
        name: "pizza",
        data: data
      }])
      console.log("bla")
      console.log('Selected Date Range:', this.dateRange);
  }

  randData(): number[] {
    var arr = [];
    for (var i = 0; i < 9; i++) {
      arr.push(Math.floor(Math.random() * 200) + 1);
    }
    return arr;
  }

  onDateRangeChange() {
    console.log("[onDateRangeChange]: Start:  " + this.dateRange.value.start +"--- End:  "+this.dateRange.value.end);

    this.dbDHTservice.getHygrometer(this.dateRange.value.start.toISOString(),this.dateRange.value.end.toISOString()).subscribe(data => {this.hygrometerData= data; })
    console.log("restapi call :")

  }
}








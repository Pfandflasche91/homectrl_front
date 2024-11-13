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

export class StatisticsComponent implements OnInit {
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  hygrometerData: Hygrometer[] = [];

  @ViewChild("chart", {static: false}) chart!: ChartComponent
  public chartOptions: Partial<ChartOptions>;



  ngOnInit(): void {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 7);
    const endDate = currentDate;
    this.dateRange = new FormGroup({
      start: new FormControl(startDate),
      end: new FormControl(endDate)
    });

    this.onDateRangeChange();
  }

  constructor(private dbDHTservice: DbDhtdataService){

    this.chartOptions = {
      series: [
        {
          name:'Temperature',
          data: this.hygrometerData.map(item => item.TEMPERATURE)
        },
        {
          name: 'Humidity',
          data: this.hygrometerData.map(item => item.HUMIDITY)
        }

      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {

      },
      xaxis: {
        type: 'datetime',
        categories: this.hygrometerData.map(item => item.DATETIME),
      },
      yaxis: [
        {
            title: {
                text: 'Temperature'
            },
            min: 0,  // Startet bei 0

        },
        {
            opposite: false,  // Rechts anzeigen
            title: {
                text: 'Humidity'
            },
            min: 0,  // Startet bei 0

        }
    ]



    };


  }
  refreshData() {
    console.log("refreshData");
    this.chart.updateOptions({
      xaxis: {
        categories: this.hygrometerData.map(item => item.DATETIME),// ,
      },
      yaxis: [
        {
            title: {
                text: 'Temperature'
            },
            min: 0,  // Startet bei 0

        },
        {
            opposite: false,  // Rechts anzeigen
            title: {
                text: 'Humidity'
            },
            min: 0,  // Startet bei 0

        }
    ]
    });
    this.chart.updateSeries([
      {
        name:'Temperature',
        data: this.hygrometerData.map(item => item.TEMPERATURE)
      },
      {
        name: 'Humidity',
        data: this.hygrometerData.map(item => item.HUMIDITY)
      }
    ])
  }


  async onDateRangeChange() {
    if(this.dateRange.value.end){
        //console.log("[onDateRangeChange]: Start:  " + this.dateRange.value.start +"--- End:  "+this.dateRange.value.end);

        //workaround NYI real solution add +1 hour because of UTC format shit issue
        this.dateRange.value.start.setUTCHours(this.dateRange.value.start.getUTCHours() + 1);
        this.dateRange.value.end.setUTCHours(this.dateRange.value.end.getUTCHours() + 1);
        try {
          const hygrometerData = await this.dbDHTservice.getHygrometer(this.dateRange.value.start.toISOString(), this.dateRange.value.end.toISOString());
          this.hygrometerData = hygrometerData;
      } catch (error) {
          console.error("Error loading hygrometer data:", error);
      }
      this.refreshData();
    }
  }


}








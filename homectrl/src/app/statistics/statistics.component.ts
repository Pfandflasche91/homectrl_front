import { Component, OnInit } from "@angular/core";
import { Temperature } from '../shared/temerature';
import { Humidity } from "../shared/humidity";
import { DbDhtdataService } from '../services/db-dhtdata.service';
import { CanvasJS } from "@canvasjs/angular-charts";
import { Chart } from 'chart.js'; // Importiere Chart

@Component({
  selector: 'hc-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})

export class StatisticsComponent {
  temperature: Temperature[] = [];
  temp_length: number = 0;
  chart : any;
  humidity: Humidity[]=[];

  ngOnInit() {
    this.chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2", // "light2", "dark1", "dark2"
		  zoomEnabled: true,
      title: {
        text: "Temperature and Humidity"
      },
      axisY: [
        {
          minimum : "-10",
          maximum : "40",
          title: "Temperatur (°C)",
          includeZero: false,

          /*crosshair: {
            enabled: true,
            snapToDataPoint: true
          }*/
        },
          {
            title: " Humidity (%)",
            showInLegend: true,
            name: "Humidity",
            minimum : "0",
            maximum : "100",
            /*crosshair: {
              enabled: true
            }*/
          }
        ],

      axisX:{
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelFormatter: function (e:any) {
           console.log(e.value);
           const date = new Date(e.value);
           console.log(date);

            return CanvasJS.formatDate(date, "DD.MMM");
          }
        },
          labelFormatter: function(e:any){
          return CanvasJS.formatDate(e.value, "DD.MMM");

      },},
      toolTip:{
        cornerRadius: 10,
        animationEnabled: true,
        shared: true,/*
        contentFormatter: function ( e:any ) {
                    const date = new Date(e.entries[0].dataPoint.x)
                    const hours = date.getHours(); // Stunden (0-23)
                    const minutes = date.getMinutes(); // Minuten (0-59)
                    const result = CanvasJS.formatDate(date, "HH:mm");
                    return result+` <b>${e.entries[0].dataPoint.y}° <br>test${e.entries[0].dataPoint.y}`  ;

        }*/
        contentFormatter: function (e:any) {
          var content = " ";
          for (var i = 0; i < e.entries.length; i++) {
            content += e.entries[i].dataSeries.name + " " + "<strong>" + e.entries[i].dataPoint.y + "</strong>";
            content += "<br/>";
          }
          return content;
        }
      },
      data: [
        {
          type: "spline", // Change type to "bar", "area", "spline", "pie",etc.
          axisYIndex: 0,
          markerType: "no marker",
          name: "Temperature",
          dataPoints: []
        },
        {
          type: "spline", // Change type to "bar", "area", "spline", "pie",etc.
          axisYIndex: 1,
          markerType: "no marker",
          name: "Humidity",
          dataPoints: []
        }
      ]
    });
    this.chart.render();
  }
  constructor(private service: DbDhtdataService){

    this.service.getAlltemp().subscribe(temperature =>{this.temperature = temperature;}, );
    this.service.getAllhum().subscribe(humidity =>{this.humidity = humidity});
    this.chart =new CanvasJS.Chart();

  }

  fetchDataAndRenderChart() {

    this.chart.options.data[0].dataPoints=[];
    this.chart.options.data[1].dataPoints=[];
    // Hier rufst du deine Daten ab, z.B. per HTTP-Anfrage
    for (let i = 0; i < this.temperature.length; i++){
      if (this.temperature[i].temperature != null){
        const date = new Date(this.temperature[i].datetime);

        const day_t = date.getDate(); // Tag (1-31)
        const month_t = date.getMonth() ; // Monat (0-11), daher +1 für korrekte Darstellung
        const year_t = date.getFullYear(); // Jahr (z.B. 2024)
        const hours_t = date.getHours(); // Stunden (0-23)
        const minutes_t = date.getMinutes(); // Minuten (0-59)
        const seconds_t = date.getSeconds(); // Sekunden (0-59)

        this.chart.options.data[0].dataPoints.push(
          { x:(new Date(year_t, month_t, day_t, hours_t, minutes_t)).getTime(), y:this.temperature[i].temperature });
          }


        //{x:(new Date(1970, 1, 3, 15, 14)).getTime(), y: 25});
      //console.log(this.chart.options.data[0].dataPoints[i] );
    }

    /*
    this.chart.options.data[0].dataPoints=[
      {x:(new Date(1970, 1, 3, 15, 14)).getTime(), y: 25},
      {x:(new Date(1970, 1, 3, 10, 0)).getTime(), y: 10}
    ]
    console.log(this.chart.options.data[0].dataPoints);
    */
    //console.log("button clicked!");


    // Hier rufst du deine Daten ab, z.B. per HTTP-Anfrage
    for (let i = 0; i < this.humidity.length; i++){
      if(this.humidity[i].humidity != null){
        const date = new Date(this.humidity[i].datetime);

      const day = date.getDate(); // Tag (1-31)
      const month = date.getMonth() ; // Monat (0-11), daher +1 für korrekte Darstellung
      const year = date.getFullYear(); // Jahr (z.B. 2024)
      const hours = date.getHours(); // Stunden (0-23)
      const minutes = date.getMinutes(); // Minuten (0-59)
      const seconds = date.getSeconds(); // Sekunden (0-59)

      this.chart.options.data[1].dataPoints.push(
        { x:(new Date(year, month, day, hours, minutes)).getTime(), y:this.humidity[i].humidity });
      }
    }
    console.log(this.chart.options.data)
    this.chart.render();
    }




  refreshData() {
    this.service.getAlltemp().subscribe(temperature =>{this.temperature = temperature;}, );
    this.service.getAllhum().subscribe(humidity =>{this.humidity = humidity});
    this.fetchDataAndRenderChart()
  }
}








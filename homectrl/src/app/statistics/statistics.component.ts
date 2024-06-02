import { Component, OnInit } from "@angular/core";
import { Temperature } from '../shared/temerature';
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


  ngOnInit() {
    this.chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2", // "light2", "dark1", "dark2"
      animationEnabled: true,
		  zoomEnabled: true,
      title: {
        text: "Temperature"
      },
      axisY: {
          minimum : "-10",
          maximum : "40",
          title: "Temperatur (°C)",
          includeZero: false,
          crosshair: {
            enabled: true
          }
      },
      axisX:{
          labelFormatter: function(e:any){
          return CanvasJS.formatDate(e.value, "DD.MMM");
      },},
      toolTip:{
        contentFormatter: function ( e:any ) {
                    const date = new Date(e.entries[0].dataPoint.x)
                    const hours = date.getHours(); // Stunden (0-23)
                    const minutes = date.getMinutes(); // Minuten (0-59)
                    const result = CanvasJS.formatDate(date, "HH:mm");
                    return result+` <b>${e.entries[0].dataPoint.y}°`  ;

        }},
      data: [
        {
          type: "spline", // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: []
        }
      ]
    });
    this.chart.render();
  }
  constructor(private service: DbDhtdataService){

    this.service.getAll().subscribe(temperature =>{this.temperature = temperature;}, );
    this.chart =new CanvasJS.Chart();

  }

  fetchDataAndRenderChart() {

    this.chart.options.data[0].dataPoints=[];
    // Hier rufst du deine Daten ab, z.B. per HTTP-Anfrage
    for (let i = 0; i < this.temperature.length; i++){
      const date = new Date(this.temperature[i].datetime);

      const day = date.getDate(); // Tag (1-31)
      const month = date.getMonth() ; // Monat (0-11), daher +1 für korrekte Darstellung
      const year = date.getFullYear(); // Jahr (z.B. 2024)
      const hours = date.getHours(); // Stunden (0-23)
      const minutes = date.getMinutes(); // Minuten (0-59)
      const seconds = date.getSeconds(); // Sekunden (0-59)

      this.chart.options.data[0].dataPoints.push(
        { x:(new Date(year, month, day, hours, minutes)).getTime(), y:this.temperature[i].temperature });
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
    this.chart.render();
  }


  refreshData() {
    this.service.getAll().subscribe(temperature =>{this.temperature = temperature;}, );
    this.fetchDataAndRenderChart()
  }
}








import { Component } from '@angular/core';
import { Temperature } from '../shared/temerature';
import { DbDhtdataService } from '../services/db-dhtdata.service';
@Component({
  selector: 'hc-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  temperature: Temperature[] = [];

  constructor(private service: DbDhtdataService){
    this.service.getAll().subscribe(temperature =>{
      this.temperature = temperature;
    })

  }

}

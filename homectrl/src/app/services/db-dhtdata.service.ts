import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Temperature } from '../shared/temperature';
import { Humidity } from '../shared/humidity';
import { Hygrometer } from '../shared/hygrometer';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbDhtdataService {

  private apiUrl = 'http://192.168.2.231:3000';

  constructor(private http: HttpClient) {}

  async getHygrometer(targetStartDatetime: Date, targetEndDatetime: Date): Promise<Hygrometer[]> {
    //console.log("[getHygrometer]: Start:  " + targetStartDatetime +"--- End:  "+targetEndDatetime);
    const start = encodeURIComponent(targetStartDatetime.toString());
    const end = encodeURIComponent(targetEndDatetime.toString());

    const url = `${this.apiUrl}/hygrometer/?targetStartDatetime=${start}&targetEndDatetime=${end}`;
    //console.log("[getHygrometer]: URL:  "+url);
    try {
      // Wandle das Observable in ein Promise um mit firstValueFrom
      const response = await firstValueFrom(this.http.get<Hygrometer[]>(url));
      console.log("[getHygrometer]: Received data", response);
      return response;
  } catch (error) {
      console.error("[getHygrometer]: Error fetching hygrometer data", error);
      throw error;
  }

  }

}




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Temperature } from '../shared/temperature';
import { Humidity } from '../shared/humidity';
import { Hygrometer } from '../shared/hygrometer';

@Injectable({
  providedIn: 'root'
})
export class DbDhtdataService {

  private apiUrl = 'http://192.168.2.231:3000';

  constructor(private http: HttpClient) {}

  getHygrometer(targetStartDatetime: Date, targetEndDatetime: Date): Observable<Hygrometer[]> {
    console.log("[getHygrometer]: Start:  " + targetStartDatetime +"--- End:  "+targetEndDatetime);
    const start = encodeURIComponent(targetStartDatetime.toString());
    const end = encodeURIComponent(targetEndDatetime.toString());

    const url = `${this.apiUrl}/hygrometer/?targetStartDatetime=${start}&targetEndDatetime=${end}`;
    console.log("[getHygrometer]: URL:  "+url);

    return this.http.get<Hygrometer[]>(url);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Temperature } from '../shared/temerature';

@Injectable({
  providedIn: 'root'
})
export class DbDhtdataService {

  private apiUrl = 'http://192.168.2.231:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Temperature[]> {
    return this.http.get<Temperature[]>(`${this.apiUrl}/temperature`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendar } from '../model/calendar';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private readonly http: HttpClient) {}

  private url = 'https://olimpiadasespecialesmanta2024.uleam.edu.ec/apiresultados';

  get(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(`${this.url}/calendar`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendar } from '../model/calendar';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private readonly http: HttpClient) {}

  private url =
    'http://localhost:4100';

  get(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(`${this.url}/calendar`);
  }

  create(calendar: any): Observable<Calendar> {
    return this.http.post<Calendar>(`${this.url}/calendar`, calendar);
  }
}

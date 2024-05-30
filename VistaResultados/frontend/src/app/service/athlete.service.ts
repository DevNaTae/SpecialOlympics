import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Athlete } from '../model/athlete';

@Injectable({
  providedIn: 'root',
})
export class AthleteService {
  constructor(private readonly http: HttpClient) {}

  private url = 'https://olimpiadasespecialesmanta2024.uleam.edu.ec/apiresultados';

  get(): Observable<Athlete[]> {
    return this.http.get<Athlete[]>(`${this.url}/athlete`);
  }
}

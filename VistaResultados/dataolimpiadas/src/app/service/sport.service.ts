import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sport } from '../model/sport';
import { SportCategory } from '../model/sport-category';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  constructor(private readonly http: HttpClient) {}

  private url = 'http://localhost:4100';

  getSport(): Observable<Sport[]> {
    return this.http.get<Sport[]>(`${this.url}/sport`);
  }

  getSportCategory(): Observable<SportCategory[]> {
    return this.http.get<SportCategory[]>(`${this.url}/sport-category`);
  }
}

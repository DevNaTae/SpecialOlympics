import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AthleteService {
  constructor(private readonly http: HttpClient) {}

  private url = 'https://663b791ffee6744a6ea1c316.mockapi.io';

  get(): Observable<any> {
    return this.http.get<any>(`${this.url}/athlete`);
  }

  getAthlete(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/athlete/${id}`);
  }
}

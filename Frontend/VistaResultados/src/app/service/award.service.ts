import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AwardService {
  constructor(private readonly http: HttpClient) {}

  private url =
    'https://specialolimpics--production-jistoria.sierranegra.cloud/api';

  get(): Observable<any> {
    return this.http.get<any>(`${this.url}/address`);
  }

  getAthlete(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/address/${id}`);
  }
}

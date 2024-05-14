import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  constructor(private readonly http: HttpClient) {}

  private url = 'https://tvs5g2hd-4100.use2.devtunnels.ms';

  get(): Observable<any> {
    return this.http.get<any>(`${this.url}/sport`);
  }

  getCategory(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/sport/${id}`);
  }
}

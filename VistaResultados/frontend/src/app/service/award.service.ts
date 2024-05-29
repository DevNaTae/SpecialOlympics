import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../model/province';

@Injectable({
  providedIn: 'root',
})
export class AwardService {
  constructor(private readonly http: HttpClient) {}

  private url = 'http://localhost:4100';

  get(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.url}/province`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../model/province';

@Injectable({
  providedIn: 'root',
})
export class AwardService {
  constructor(private readonly http: HttpClient) {}

  private url = 'https://olimpiadasespecialesmanta2024.uleam.edu.ec/apiresultados';

  get(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.url}/province`);
  }
}

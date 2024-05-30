import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private readonly http: HttpClient) {}

  private url = 'https://olimpiadasespecialesmanta2024.uleam.edu.ec/apiresultados';

  get(): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.url}/result`);
  }
}

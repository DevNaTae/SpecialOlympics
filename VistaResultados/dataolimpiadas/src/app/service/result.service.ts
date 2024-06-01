import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private readonly http: HttpClient) {}

  private url = 'http://localhost:4100';

  get(): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.url}/result`);
  }

  create(result: any): Observable<Result> {
    return this.http.post<Result>(`${this.url}/result`, result);
  }
}

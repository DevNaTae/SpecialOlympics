import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../model/place';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  constructor(private readonly http: HttpClient) {}

  private url = 'http://localhost:4100';

  get(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.url}/place`);
  }
}

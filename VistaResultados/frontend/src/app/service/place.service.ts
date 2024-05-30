import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../model/place';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  constructor(private readonly http: HttpClient) {}

  private url = 'https://olimpiadasespecialesmanta2024.uleam.edu.ec/apiresultados';

  get(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.url}/place`);
  }
}

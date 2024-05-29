import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gallery } from '../model/gallery';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor(private readonly http: HttpClient) {}

  private url = 'http://localhost:4100';

  get(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.url}/gallery`);
  }
}

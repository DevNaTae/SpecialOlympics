import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../model/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private readonly http: HttpClient) {}

  private url =
    'http://localhost:4100';

  get(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.url}/activity`);
  }

  create(activity: any): Observable<Activity> {
    return this.http.post<Activity>(`${this.url}/activity`, activity);
  }
}

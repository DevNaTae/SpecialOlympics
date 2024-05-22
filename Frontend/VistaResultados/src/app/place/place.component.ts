import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../service/place.service';
import { Place } from '../model/place';
import { tap, catchError, of, finalize } from 'rxjs';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrl: './place.component.css',
})
export class PlaceComponent implements OnInit {
  places: Readonly<Place[]> = [];
  loading = false;
  constructor(private readonly placeService: PlaceService) {}

  ngOnInit() {
    this.fetchplaces();
    console.log('places', this.places);
  }

  private fetchplaces() {
    const placesFromStorage = this.getplacesFromStorage();

    if (placesFromStorage) {
      this.places = placesFromStorage;
      this.checkForUpdates();
    } else {
      this.loadplacesFromService();
    }
  }

  private getplacesFromStorage(): Readonly<Place[]> | null {
    const placesJson = localStorage.getItem('places');
    return placesJson ? JSON.parse(placesJson) : null;
  }

  private saveplacesToStorage(places: Readonly<Place[]>) {
    localStorage.setItem('places', JSON.stringify(places));
  }

  private loadplacesFromService() {
    this.loading = true;
    this.placeService
      .get()
      .pipe(
        tap((places) => this.saveplacesToStorage(places)),
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((places) => (this.places = places));
  }

  private checkForUpdates() {
    this.placeService
      .get()
      .pipe(
        tap((places) => {
          if (JSON.stringify(places) !== JSON.stringify(this.places)) {
            this.saveplacesToStorage(places);
            this.places = places;
          }
        }),
        catchError((err) => {
          console.error(err);
          return of(this.places);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }
}

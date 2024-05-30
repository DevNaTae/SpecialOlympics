import { Component } from '@angular/core';
import { Sport } from '../model/sport';
import { tap, catchError, of, finalize } from 'rxjs';
import { SportService } from '../service/sport.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.css',
})
export class SportComponent {
  sports: Readonly<Sport[]> = [];
  loading = false;
  current = '';
  constructor(
    private readonly sportservice: SportService,
    private readonly titleService: Title
  ) {}

  ngOnInit() {
    this.fetchsports();
    this.titleService.setTitle('OE Deportes');
  }

  private fetchsports() {
    const sportsFromStorage = this.getsportsFromStorage();

    if (sportsFromStorage) {
      this.sports = sportsFromStorage;
      this.checkForUpdates();
    } else {
      this.loadsportsFromService();
    }
  }

  private getsportsFromStorage(): Readonly<Sport[]> | null {
    const sportsJson = localStorage.getItem('sports');
    return sportsJson ? JSON.parse(sportsJson) : null;
  }

  private savesportsToStorage(sports: Readonly<Sport[]>) {
    localStorage.setItem('sports', JSON.stringify(sports));
  }

  private loadsportsFromService() {
    this.loading = true;
    this.sportservice
      .getSport()
      .pipe(
        tap((sports) => this.savesportsToStorage(sports)),
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((sports) => (this.sports = sports));
  }

  private checkForUpdates() {
    this.sportservice
      .getSport()
      .pipe(
        tap((sports) => {
          if (JSON.stringify(sports) !== JSON.stringify(this.sports)) {
            this.savesportsToStorage(sports);
            this.sports = sports;
          }
        }),
        catchError((err) => {
          console.error(err);
          return of(this.sports);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }
}

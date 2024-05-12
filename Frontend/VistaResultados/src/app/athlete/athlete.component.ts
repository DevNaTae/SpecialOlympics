import { Component, OnInit } from '@angular/core';
import { AthleteService } from '../service/athlete.service';
import { Athlete } from '../model/athlete';
import { tap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.css'],
})
export class AthleteComponent implements OnInit {
  p = 1;
  pageSize = 5;
  loading = false;
  athletes: Readonly<Athlete[]> = [];
  searchText = '';

  constructor(private readonly athleteService: AthleteService) {}

  ngOnInit() {
    this.fetchAthletes();
  }

  changeCant(cant: number) {
    this.pageSize = cant;
  }

  filterAthletes() {
    let filteredAthletes = this.athletes;
    if (this.searchText.trim() !== '') {
      this.p = 1;
      return this.athletes.filter(
        (athlete) =>
          athlete.name!.toLowerCase().includes(this.searchText.toLowerCase()) ||
          athlete.dni!.toString().includes(this.searchText)
      );
    }
    return filteredAthletes;
  }

  private fetchAthletes() {
    const athletesFromStorage = this.getAthletesFromStorage();

    if (athletesFromStorage) {
      this.athletes = athletesFromStorage;
      this.checkForUpdates();
    } else {
      this.loadAthletesFromService();
    }
  }

  private getAthletesFromStorage(): Readonly<Athlete[]> | null {
    const athletesJson = localStorage.getItem('athletes');
    return athletesJson ? JSON.parse(athletesJson) : null;
  }

  private saveAthletesToStorage(athletes: Readonly<Athlete[]>) {
    localStorage.setItem('athletes', JSON.stringify(athletes));
  }

  private loadAthletesFromService() {
    this.loading = true;
    this.athleteService
      .get()
      .pipe(
        tap((athletes) => this.saveAthletesToStorage(athletes)),
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((athletes) => (this.athletes = athletes));
  }

  private checkForUpdates() {
    this.athleteService
      .get()
      .pipe(
        tap((athletes) => {
          if (JSON.stringify(athletes) !== JSON.stringify(this.athletes)) {
            this.saveAthletesToStorage(athletes);
            this.athletes = athletes;
          }
        }),
        catchError((err) => {
          console.error(err);
          return of(this.athletes);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { AthleteService } from '../service/athlete.service';
import { Athlete } from '../model/athlete';
import { tap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { SportCategory } from '../model/sport-category';
import { Title } from '@angular/platform-browser';

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
  query = 'atleta';

  constructor(
    private readonly athleteService: AthleteService,
    private readonly titleService: Title
  ) {}

  ngOnInit() {
    this.fetchAthletes();
    this.titleService.setTitle('OE Atletas');
  }

  changeQuery(query: string) {
    this.query = query;
  }

  stringifyActivity(activity: any) {
    return JSON.stringify(activity);
  }

  changeCant(cant: number) {
    this.p = 1;
    this.pageSize = cant;
  }

  filterAthletes() {
    let filteredAthletes = this.athletes;
    if (this.searchText.trim() !== '') {
      if (this.query === 'atleta') {
        return this.athletes.filter((athlete) =>
          athlete.name!.toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else if (this.query === 'provincia') {
        return this.athletes.filter((athlete) =>
          athlete.address!.toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else if (this.query === 'deporte') {
        return this.athletes.filter((athlete) =>
          athlete.SportCategory!.some((category) =>
            category
              .sport!.name!.toLowerCase()
              .includes(this.searchText.toLowerCase())
          )
        );
      }
    }
    return filteredAthletes;
  }

  getSportNames(sportCategories: SportCategory[]): string[] {
    const sportNames = new Set<string>();
    sportCategories.forEach((sc) => {
      if (sc.sport) {
        sportNames.add(sc.sport.name!);
      }
    });
    return Array.from(sportNames);
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

  getImage(nameA: string) {
    const [name, lname] = nameA.split(' ');
    const fname = name + '_' + lname.toLowerCase();
    return fname;
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
        })
      )
      .subscribe();
  }
}

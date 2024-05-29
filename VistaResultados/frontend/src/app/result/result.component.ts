import { Component } from '@angular/core';
import { Result } from '../model/result';
import { catchError, finalize, of, tap } from 'rxjs';
import { ResultService } from '../service/result.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {
  results: Readonly<Result[]> = [];
  loading = false;
  constructor(
    private readonly titleService: Title,
    private readonly resultService: ResultService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('OE Resultados');
    this.fetchResults();
  }

  getImage(nameA: string) {
    const [name, lname] = nameA.split(' ');
    const fname = name + '_' + lname.toLowerCase();
    console.log(fname);

    return fname;
  }

  private fetchResults() {
    const sportsFromStorage = this.getResultsFromStorage();

    if (sportsFromStorage) {
      this.results = sportsFromStorage;
      this.checkForUpdates();
    } else {
      this.loadResultsFromService();
    }
  }

  private getResultsFromStorage(): Readonly<Result[]> | null {
    const sportsJson = localStorage.getItem('results');
    return sportsJson ? JSON.parse(sportsJson) : null;
  }

  private savesportsToStorage(results: Readonly<Result[]>) {
    localStorage.setItem('results', JSON.stringify(results));
  }

  private loadResultsFromService() {
    this.loading = true;
    this.resultService
      .get()
      .pipe(
        tap((results) => this.savesportsToStorage(results)),
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((sports) => (this.results = sports));
  }

  private checkForUpdates() {
    this.resultService
      .get()
      .pipe(
        tap((sports) => {
          if (JSON.stringify(sports) !== JSON.stringify(this.results)) {
            this.savesportsToStorage(sports);
            this.results = sports;
          }
        }),
        catchError((err) => {
          console.error(err);
          return of(this.results);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }
}

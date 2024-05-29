import { Component } from '@angular/core';
import { Sport } from '../model/sport';
import { ActivatedRoute } from '@angular/router';
import { SportService } from '../service/sport.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { SportCategory } from '../model/sport-category';

@Component({
  selector: 'app-sport-category',
  templateUrl: './sport-category.component.html',
  styleUrl: './sport-category.component.css',
})
export class SportCategoryComponent {
  sport: Sport = {};
  categorySports: Readonly<SportCategory[]> = [];
  loading = false;

  constructor(
    private readonly sportService: SportService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((res: Sport) => {
      this.sport = res;
    });
    this.fetchcategorySports();
    console.log(this.categorySports);
  }

  stringifySport(sport: any): string {
    return JSON.stringify(sport);
  }

  private fetchcategorySports() {
    const categorySportsFromStorage = this.getcategorySportsFromStorage();

    if (categorySportsFromStorage) {
      this.categorySports = categorySportsFromStorage;
      this.checkForUpdates();
    } else {
      this.loadcategorySportsFromService();
    }
  }

  private getcategorySportsFromStorage(): Readonly<SportCategory[]> | null {
    const categorySportsJson = localStorage.getItem('CategorySports');
    return categorySportsJson ? JSON.parse(categorySportsJson) : null;
  }

  private savecategorySportsToStorage(
    categorySports: Readonly<SportCategory[]>
  ) {
    localStorage.setItem('CategorySports', JSON.stringify(categorySports));
  }

  private loadcategorySportsFromService() {
    this.loading = true;
    this.sportService
      .getSportCategory()
      .pipe(
        tap((categorySports) =>
          this.savecategorySportsToStorage(categorySports)
        ),
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((categorySports) => (this.categorySports = categorySports));
  }

  private checkForUpdates() {
    this.sportService
      .getSportCategory()
      .pipe(
        tap((categorySports) => {
          if (
            JSON.stringify(categorySports) !==
            JSON.stringify(this.categorySports)
          ) {
            this.savecategorySportsToStorage(categorySports);
            this.categorySports = categorySports;
          }
        }),
        catchError((err) => {
          console.error(err);
          return of(this.categorySports);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }
}

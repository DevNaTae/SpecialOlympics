import { Component } from '@angular/core';
import { AwardService } from '../service/award.service';
import { Award } from '../model/award';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrl: './award.component.css',
})
export class AwardComponent {
  awards: Readonly<Award[]> = [];
  loading = false;
  constructor(private readonly awardService: AwardService) {}

  ngOnInit() {
    this.fetchAwards();
  }

  private fetchAwards() {
    const sportsFromStorage = this.getsAwardsFromStorage();

    if (sportsFromStorage) {
      this.awards = sportsFromStorage;
      this.checkForUpdates();
    } else {
      this.loadAwardsFromService();
    }
  }

  private getsAwardsFromStorage(): Readonly<Award[]> | null {
    const awardsJson = localStorage.getItem('awards');
    return awardsJson ? JSON.parse(awardsJson) : null;
  }

  private saveAwardsToStorage(sports: Readonly<Award[]>) {
    localStorage.setItem('awards', JSON.stringify(sports));
  }

  private loadAwardsFromService() {
    this.loading = true;
    this.awardService
      .get()
      .pipe(
        tap((awards) => this.saveAwardsToStorage(awards)),
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((awards) => (this.awards = awards));
  }

  private checkForUpdates() {
    this.awardService
      .get()
      .pipe(
        tap((awards) => {
          if (JSON.stringify(awards) !== JSON.stringify(this.awards)) {
            this.saveAwardsToStorage(awards);
            this.awards = awards;
          }
        }),
        catchError((err) => {
          console.error(err);
          return of(this.awards);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }
}

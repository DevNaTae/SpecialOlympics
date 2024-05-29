import { Component } from '@angular/core';
import { AwardService } from '../service/award.service';
import { Award } from '../model/award';
import { catchError, finalize, of, tap } from 'rxjs';
import { Province } from '../model/province';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrl: './award.component.css',
})
export class AwardComponent {
  awards: Readonly<Province[]> = [];
  loading = false;
  constructor(
    private readonly titleService: Title,
    private readonly awardService: AwardService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('OE Medallero');
    this.fetchAwards();
  }

  countOro(award: Award[]) {
    return award.filter((type) => type.type === 'oro').length;
  }

  countPlata(award: Award[]) {
    return award.filter((type) => type.type === 'plata').length;
  }

  countBronce(award: Award[]) {
    return award.filter((type) => type.type === 'bronce').length;
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

  private getsAwardsFromStorage(): Readonly<Province[]> | null {
    const awardsJson = localStorage.getItem('awards');
    return awardsJson ? JSON.parse(awardsJson) : null;
  }

  private saveAwardsToStorage(sports: Readonly<Province[]>) {
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

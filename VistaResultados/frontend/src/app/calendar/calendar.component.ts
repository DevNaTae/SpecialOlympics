import { Component } from '@angular/core';
import { Calendar } from '../model/calendar';
import { CalendarService } from '../service/calendar.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  selectedTab = 'uno';
  calendars: Readonly<Calendar[]> = [];
  loading = false;
  constructor(
    private readonly titleService: Title,
    private readonly calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('OE Calendario');
    this.fetchcalendar();
  }

  private fetchcalendar() {
    const calendarFromStorage = this.getcalendarFromStorage();

    if (calendarFromStorage) {
      this.calendars = calendarFromStorage;
      this.checkForUpdates();
    } else {
      this.loadcalendarFromService();
    }
  }

  private getcalendarFromStorage(): Readonly<Calendar[]> | null {
    const calendarJson = localStorage.getItem('calendars');
    return calendarJson ? JSON.parse(calendarJson) : null;
  }

  private savecalendarToStorage(calendar: Readonly<Calendar[]>) {
    localStorage.setItem('calendars', JSON.stringify(calendar));
  }

  private loadcalendarFromService() {
    this.loading = true;
    this.calendarService
      .get()
      .pipe(
        tap((calendar) => this.savecalendarToStorage(calendar)),
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((calendar) => (this.calendars = calendar));
  }

  private checkForUpdates() {
    this.calendarService
      .get()
      .pipe(
        tap((calendar) => {
          if (JSON.stringify(calendar) !== JSON.stringify(this.calendars)) {
            this.savecalendarToStorage(calendar);
            this.calendars = calendar;
          }
        }),
        catchError((err) => {
          console.error(err);
          return of(this.calendars);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }
}

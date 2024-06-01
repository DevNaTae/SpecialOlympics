import { Component, OnInit } from '@angular/core';
import { Athlete } from './model/athlete';
import { AthleteService } from './service/athlete.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SportService } from './service/sport.service';
import { SportCategory } from './model/sport-category';
import { Calendar } from './model/calendar';
import { CalendarService } from './service/calendar.service';
import { PlaceService } from './service/place.service';
import { Place } from './model/place';
import { Sport } from './model/sport';
import { ResultService } from './service/result.service';
import { Result } from './model/result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly sportCategoryService: SportService,
    private readonly calendarService: CalendarService,
    private readonly placeService: PlaceService,
    private readonly sportService: SportService,
    private readonly resultService: ResultService
  ) {}

  sportCategorys: SportCategory[] = [];
  calendars: Calendar[] = [];
  places: Place[] = [];
  sports: Sport[] = [];
  results: Result[] = [];

  ResultForm = new FormGroup({
    value: new FormControl(),
    type: new FormControl(),
    athlete: new FormControl(),
    calendar: new FormControl(),
    SportCategory: new FormControl(),
  });

  ngOnInit() {
    this.getSportCategory();
    //this.getPlaces();
    this.getCalendar();
    this.getResult();
  }

  getSports() {
    this.sportService.getSport().subscribe({
      next: (sport) => {
        this.sports = sport;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getPlaces() {
    this.placeService.get().subscribe({
      next: (places) => {
        this.places = places;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getSportCategory() {
    this.sportCategoryService.getSportCategory().subscribe({
      next: (sportCategory) => {
        this.sportCategorys = sportCategory;
        this.sportCategorys.sort((a, b) => a.name!.localeCompare(b.name!));
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getCalendar() {
    this.calendarService.get().subscribe({
      next: (calendar) => {
        this.calendars = calendar;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getResult() {
    this.resultService.get().subscribe({
      next: (result) => {
        this.results = result;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  createResult() {
    this.resultService.create(this.ResultForm.value).subscribe({
      next: () => {
        alert('Resultado creado');
        this.ResultForm.reset();
        this.getResult();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

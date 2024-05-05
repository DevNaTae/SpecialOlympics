import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { SportComponent } from './sport/sport.component';
import { AthleteComponent } from './athlete/athlete.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PlaceComponent } from './place/place.component';

@NgModule({
  declarations: [AppComponent, IndexComponent, SportComponent, AthleteComponent, CalendarComponent, PlaceComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SportComponent } from './sport/sport.component';
import { AthleteComponent } from './athlete/athlete.component';
import { PlaceComponent } from './place/place.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AwardComponent } from './award/award.component';
import { ResultComponent } from './result/result.component';
import { ProfileComponent } from './profile/profile.component';
import { SportCategoryComponent } from './sport-category/sport-category.component';
import { SportInfoComponent } from './sport-info/sport-info.component';
import { UbicationComponent } from './ubication/ubication.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  {
    path: 'sport',
    children: [
      { path: '', component: SportComponent },
      {
        path: ':id',
        children: [
          { path: '', component: SportCategoryComponent },
          { path: ':id', component: SportInfoComponent },
        ],
      },
    ],
  },
  {
    path: 'athlete',
    children: [
      { path: '', component: AthleteComponent },
      { path: ':id', component: ProfileComponent },
    ],
  },
  {
    path: 'place',
    children: [
      { path: '', component: PlaceComponent },
      { path: ':id', component: UbicationComponent },
    ],
  },
  { path: 'calendar', component: CalendarComponent },
  { path: 'award', component: AwardComponent },
  { path: 'result', component: ResultComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '**', redirectTo: 'index' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

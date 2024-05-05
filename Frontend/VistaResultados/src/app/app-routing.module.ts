import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SportComponent } from './sport/sport.component';
import { AthleteComponent } from './athlete/athlete.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'sport', component: SportComponent },
  { path: 'athlete', component: AthleteComponent },
  { path: 'place', component: AthleteComponent },
  { path: 'calendar', component: AthleteComponent },
  { path: '**', redirectTo: 'index' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

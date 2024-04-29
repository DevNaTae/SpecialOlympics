import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBasketballBall,
  faCalendar,
  faLocationDot,
  faPersonSnowboarding,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css',
    '/node_modules/bootstrap/dist/css/bootstrap.min.css',
  ],
})
export class NavbarComponent {
  sport = faBasketballBall;
  people = faPersonSnowboarding;
  location = faLocationDot;
  events = faCalendar;
}

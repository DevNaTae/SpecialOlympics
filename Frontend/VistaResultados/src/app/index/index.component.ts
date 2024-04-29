import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBasketballBall,
  faCalendar,
  faLocationDot,
  faPersonSnowboarding,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  sport = faBasketballBall;
  people = faPersonSnowboarding;
  location = faLocationDot;
  events = faCalendar;
}

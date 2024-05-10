import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Athlete } from '../model/athlete';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  athlete: Athlete = {};
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((res: Athlete) => {
      this.athlete = res;
      console.log(this.athlete);
    });
  }
}

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
    this.route.queryParams.subscribe((res: any) => {
      if (res.activity) {
        let activity = JSON.parse(res.activity as unknown as string) as Event[];
        if (Array.isArray(activity)) {
          this.athlete = { ...res, activity: activity };
        } else {
          console.error('activity is not an array:', activity);
        }
      } else {
        this.athlete = res;
      }
      console.log(this.athlete);
    });
  }
}

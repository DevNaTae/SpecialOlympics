import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Athlete } from '../model/athlete';
import { SportCategory } from '../model/sport-category';

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
      if (res.SportCategory) {
        let activity = JSON.parse(
          res.SportCategory as unknown as string
        ) as SportCategory[];
        if (Array.isArray(activity)) {
          this.athlete = { ...res, SportCategory: activity };
        } else {
          console.error('sport_category is not an array:', activity);
        }
      } else {
        this.athlete = res;
      }
      console.log(this.athlete);
    });
  }

  getImage(nameA: string) {
    const [name, lname] = nameA.split(' ');
    const fname = name + '_' + lname.toLowerCase();
    console.log(fname);

    return fname;
  }
}

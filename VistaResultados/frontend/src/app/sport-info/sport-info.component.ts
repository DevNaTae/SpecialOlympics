import { Component } from '@angular/core';
import { SportCategory } from '../model/sport-category';
import { ActivatedRoute } from '@angular/router';
import { Sport } from '../model/sport';

@Component({
  selector: 'app-sport-info',
  templateUrl: './sport-info.component.html',
  styleUrl: './sport-info.component.css',
})
export class SportInfoComponent {
  sportCategory: SportCategory = {};
  loading = false;
  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((res: any) => {
      if (res.sport !== undefined) {
        let sport = JSON.parse(res.sport);
        this.sportCategory = { ...res, sport };
        console.log(this.sportCategory);
      }
    });
  }
}

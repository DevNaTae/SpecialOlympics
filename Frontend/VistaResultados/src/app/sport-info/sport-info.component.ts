import { Component } from '@angular/core';
import { SportCategory } from '../model/sport-category';
import { ActivatedRoute } from '@angular/router';

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
    this.route.queryParams.subscribe((res: SportCategory) => {
      this.sportCategory = res;
    });
  }
}

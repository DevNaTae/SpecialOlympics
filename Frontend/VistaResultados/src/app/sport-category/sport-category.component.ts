import { Component } from '@angular/core';
import { Sport } from '../model/sport';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sport-category',
  templateUrl: './sport-category.component.html',
  styleUrl: './sport-category.component.css',
})
export class SportCategoryComponent {
  sport: Sport = {};
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((res: Sport) => {
      this.sport = res;
    });
  }
}

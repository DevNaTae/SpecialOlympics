import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../model/place';

@Component({
  selector: 'app-ubication',
  templateUrl: './ubication.component.html',
  styleUrl: './ubication.component.css',
})
export class UbicationComponent {
  place: Place = {};
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((res: any) => {
      this.place = {
        name: res.name,
        address: res.address,
        img_url: [res.img_url1, res.img_url2, res.img_url3],
        description: res.description,
      };
    });
  }
}

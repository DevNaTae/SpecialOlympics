import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../model/place';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ubication',
  templateUrl: './ubication.component.html',
  styleUrl: './ubication.component.css',
})
export class UbicationComponent {
  place: Place = {};
  constructor(
    private readonly route: ActivatedRoute,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((res: any) => {
      this.place = res;
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

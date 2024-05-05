import { AfterViewInit, Component } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.loadScript();
  }

  loadScript() {
    $(window).on('load', function () {
      $('.loadding-page').delay(1000).fadeOut(200);
    });
  }
}

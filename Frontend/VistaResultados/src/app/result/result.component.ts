import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnInit {
  loading = true;

  get stateName() {
    return this.loading ? 'show' : 'hide';
  }
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}

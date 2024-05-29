import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  constructor(private readonly titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('OE Inicio');
  }
}

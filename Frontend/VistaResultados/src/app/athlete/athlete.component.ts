import { Component, OnInit } from '@angular/core';
import { AthleteService } from '../service/athlete.service';
import { Athlete } from '../model/athlete';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.css',
})
export class AthleteComponent implements OnInit {
  loading: boolean = false;
  athletes: Athlete[] = [];
  constructor(private readonly athleteService: AthleteService) {}

  ngOnInit() {
    this.get();
  }

  get() {
    let ath: Athlete[] = JSON.parse(localStorage.getItem('athletes')!);
    this.athletes = ath;
    if (!JSON.stringify(ath).length || !ath) {
      this.loading = true;
      this.athleteService.get().subscribe({
        next: (res: Athlete[]) => {
          this.athletes = res;
          localStorage.setItem('athletes', JSON.stringify(res));
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      ath = JSON.parse(localStorage.getItem('athletes')!);
      this.athleteService.get().subscribe({
        next: (res: Athlete[]) => {
          if (JSON.stringify(res) !== JSON.stringify(ath)) {
            this.loading = true;
            localStorage.setItem('athletes', JSON.stringify(res));
            this.athletes = res;
          }
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}

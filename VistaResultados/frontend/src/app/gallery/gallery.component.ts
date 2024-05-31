import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GalleryService } from '../service/gallery.service';
import { Gallery } from '../model/gallery';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  gallerys: Readonly<Gallery[]> = [];
  loading = false;
  constructor(
    private readonly titleService: Title,
    private readonly galleryService: GalleryService
  ) {}
  ngOnInit() {
    this.fetchgallerys();
    this.titleService.setTitle('OE Galería');
  }

  private fetchgallerys() {
    const gallerysFromStorage = this.getgallerysFromStorage();

    if (gallerysFromStorage) {
      this.gallerys = gallerysFromStorage;
      this.checkForUpdates();
    } else {
      this.loadgallerysFromService();
    }
  }

  private getgallerysFromStorage(): Readonly<Gallery[]> | null {
    const gallerysJson = localStorage.getItem('gallerys');
    return gallerysJson ? JSON.parse(gallerysJson) : null;
  }

  private savegallerysToStorage(gallerys: Readonly<Gallery[]>) {
    localStorage.setItem('gallerys', JSON.stringify(gallerys));
  }

  private loadgallerysFromService() {
    this.loading = true;
    this.galleryService
      .get()
      .pipe(
        tap((gallerys) => this.savegallerysToStorage(gallerys)),
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((gallerys) => (this.gallerys = gallerys));
  }

  private checkForUpdates() {
    this.galleryService
      .get()
      .pipe(
        tap((gallerys) => {
          if (JSON.stringify(gallerys) !== JSON.stringify(this.gallerys)) {
            this.savegallerysToStorage(gallerys);
            this.gallerys = gallerys;
          }
        }),
        catchError((err) => {
          console.error(err);
          return of(this.gallerys);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }
}

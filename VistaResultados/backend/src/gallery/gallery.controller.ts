import { Body, Controller, Get, Post } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { Gallery } from './gallery.interface';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Post()
  crearCancion(@Body() athleteDto: Gallery) {
    return this.galleryService.create(athleteDto);
  }
}

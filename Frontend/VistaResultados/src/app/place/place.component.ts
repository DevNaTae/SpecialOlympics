import { Component } from '@angular/core';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrl: './place.component.css',
})
export class PlaceComponent {
  constructor(private readonly addressService: AddressService) {}
}

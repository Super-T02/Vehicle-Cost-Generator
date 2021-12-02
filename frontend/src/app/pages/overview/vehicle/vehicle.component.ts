import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../../../models/vehicle.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.less']
})
export class VehicleComponent implements OnInit {

  @Input() vehicle: Vehicle;

  year: number;

  constructor() { }

  ngOnInit(): void {
    this.vehicle.year? this.year = new Date(this.vehicle.year).getFullYear(): this.year = 0;
  }

  delete(): void {
    console.log('Delete', this.vehicle.vin);
  }

  edit(): void {
    console.log('Edit', this.vehicle.vin);
  }

}

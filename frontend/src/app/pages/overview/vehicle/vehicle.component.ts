import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../../../models/vehicle.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.less']
})
export class VehicleComponent implements OnInit {

  @Input() vehicle: Vehicle;

  constructor() { }

  ngOnInit(): void {
  }

  delete(): void {
    console.log('Delete', this.vehicle.vin);
  }

  edit(): void {
    console.log('Edit', this.vehicle.vin);
  }

}

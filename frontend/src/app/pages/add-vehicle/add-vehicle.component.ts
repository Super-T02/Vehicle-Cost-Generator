import { Component, OnInit } from '@angular/core';
import {LastRouteService} from '../../core/services/last-route.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.less']
})
export class AddVehicleComponent implements OnInit {

  constructor(
    private lastRoute: LastRouteService
  ) {
  }

  ngOnInit(): void {
    this.lastRoute.newUrlString('/overview/addVehicle');
  }
}

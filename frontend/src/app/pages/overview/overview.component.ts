import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Dimension, Vehicle} from '../../models/vehicle.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.vehicles = [{
      vin: 'WBAUK31050VM63456',
      name: 'Mein BMW',
      year: 2010,
      make: 'BMW',
      model: '116i',
      type: 'Little Car',
      color: 'Black',
      license: 'TÜ-T-7502',
    }];
  }

}

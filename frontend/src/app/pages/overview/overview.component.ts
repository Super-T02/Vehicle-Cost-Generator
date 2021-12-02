import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Vehicle} from '../../models/vehicle.model';
import {ApiService} from '../../core/services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit {
  vehicles: Vehicle[];


  constructor(
    public auth: AuthService,
    private api: ApiService,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.vehicles = [];

    this.api.getVehicles(this.auth.username).subscribe(result => {
      this.vehicles = result.data;
    });
  }

  addVehicle() {
    this.route.navigate(['addVehicle']);
  }
}
/*
{
      vin: 'WBAUK31050VM63456',
      name: 'Mein BMW',
      year: 2010,
      make: 'BMW',
      model: '116i',
      type: 'Little Car',
      color: 'Black',
      license: 'TÜ-T-7502',
    },
    {
      vin: 'WBAUK31050VM63456',
      name: 'Mein BMW',
      year: 2010,
      make: 'BMW',
      model: '116i',
      type: 'Little Car',
      color: 'Black',
      license: 'TÜ-T-7502',
    },
    {
      vin: 'WBAUK31050VM63456',
      name: 'Mein BMW',
      year: 2010,
      make: 'BMW',
      model: '116i',
      type: 'Little Car',
      color: 'Black',
      license: 'TÜ-T-7502',
    },
    {
      vin: 'WBAUK31050VM63456',
      name: 'Mein BMW',
      year: 2010,
      make: 'BMW',
      model: '116i',
      type: 'Little Car',
      color: 'Black',
      license: 'TÜ-T-7502',
    },
    {
      vin: 'WBAUK31050VM63456',
      name: 'Mein BMW',
      year: 2010,
      make: 'BMW',
      model: '116i',
      type: 'Little Car',
      color: 'Black',
      license: 'TÜ-T-7502',
    },
    {
      vin: 'WBAUK31050VM63456',
      name: 'Mein BMW',
      year: 2010,
      make: 'BMW',
      model: '116i',
      type: 'Little Car',
      color: 'Black',
      license: 'TÜ-T-7502',
    },
    {
      vin: 'WBAUK31050VM63456',
      name: 'Mein BMW',
      year: 2010,
      make: 'BMW',
      model: '116i',
      type: 'Little Car',
      color: 'Black',
      license: 'TÜ-T-7502',
    },
    {
      vin: 'WBAUK31050VM63456',
      name: 'Mein BMW',
      year: 2010,
      make: 'BMW',
      model: '116i',
      type: 'Little Car',
      color: 'Black',
      license: 'TÜ-T-7502',
    },
    {
      vin: 'WBAUK31050VM63456',
      name: 'Mein BMW',
      year: 2010,
      make: 'BMW',
      model: '116i',
      type: 'Little Car',
      color: 'Black',
      license: 'TÜ-T-7502',
    },
    {
      vin: 'WBAUK31050VM63456',
      name: 'Mein BMW',
      year: 2010,
      make: 'BMW',
      model: '116i',
      type: 'Little Car',
      color: 'Black',
      license: 'TÜ-T-7502',
    }
* */

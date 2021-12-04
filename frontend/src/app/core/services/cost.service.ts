import { Injectable } from '@angular/core';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../models/cost.model';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CostService {
  costs: {single: SingleCostItem[], repeating: RepeatingCostItem[], fuel: FuelCostItem[]};

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) {
    this.unloadCosts();
  }

  loadCosts(vin: string) {
    const username = this.auth.username;

    this.costs.single = [
      {
        id: '123',
        vin: 'WBAUK31050VM63456',
        username: 'Tom',
        km: 600,
        price: 400,
        date: new Date('Fri Dec 03 2010 19:26:05 GMT+0100 (Mitteleuropäische Normalzeit)'),
        type: 'Test',
        name: 'Test Zweck',
        description: 'For testing this is a description'
      },
      {
        id: '1234',
        vin: 'WBAUK31050VM63456',
        username: 'Tom',
        km: 600,
        price: 400,
        date: new Date('Fri Dec 03 2010 19:26:05 GMT+0100 (Mitteleuropäische Normalzeit)'),
        type: 'Test',
        name: 'Test Zweck',
        description: 'For testing this is a description'
      },
      {
        id: '1235',
        vin: 'WBAUK31050VM63456',
        username: 'Tom',
        km: 600,
        price: 400,
        date: new Date('Fri Dec 03 2010 19:26:05 GMT+0100 (Mitteleuropäische Normalzeit)'),
        type: 'Test',
        name: 'Test Zweck',
        description: 'For testing this is a description'
      },
      {
        id: '1236',
        vin: 'WBAUK31050VM63456',
        username: 'Tom',
        km: 600,
        price: 400,
        date: new Date('Fri Dec 03 2010 19:26:05 GMT+0100 (Mitteleuropäische Normalzeit)'),
        type: 'Test',
        name: 'Test Zweck',
        description: 'For testing this is a description'
      },
    ];

    // this.api.getSingleCosts(username, vin).subscribe(
    //   value => this.costs.single = value.data
    // );
    // this.api.getRepeatingCosts(username, vin).subscribe(
    //   value => this.costs.repeating = value.data
    // );
    // this.api.getFuelCosts(username, vin).subscribe(
    //   value => this.costs.fuel = value.data
    // );
  }

  /**
   * Sets all costs to a empty array
   */
  unloadCosts() {
    this.costs = {
      single: [],
      repeating: [],
      fuel: []
    };
  }
}

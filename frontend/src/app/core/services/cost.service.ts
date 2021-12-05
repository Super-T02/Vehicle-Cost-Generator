import { Injectable } from '@angular/core';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../models/cost.model';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CostService {
  costs: {single: SingleCostItem[], repeating: RepeatingCostItem[], fuel: FuelCostItem[]};
  updateType: 'single' | 'repeating' | 'fuel';

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) {
    this.unloadCosts();
  }

  loadCosts(vin: string) {
    const username = this.auth.username;

    this.api.getSingleCosts(username, vin).subscribe(
      value => {

        for (const datum of value.data) {
          datum.date = new Date(datum.date);
        }

        this.costs.single = value.data;
      }
    );
    this.api.getRepeatingCosts(username, vin).subscribe(
      value => {

        for (const datum of value.data) {
          datum.date = new Date(datum.date);
        }

        this.costs.repeating = value.data;
      }
    );
    this.api.getFuelCosts(username, vin).subscribe(
      value => {

        for (const datum of value.data) {
          datum.date = new Date(datum.date);
        }

        this.costs.fuel = value.data;
      }
    );
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

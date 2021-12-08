import { Injectable } from '@angular/core';
import {CostPerMonth, FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../models/cost.model';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostService {
  costs: {single: SingleCostItem[], repeating: RepeatingCostItem[], fuel: FuelCostItem[]};
  costPerMonth: Subject<{type: 'single' | 'repeating' | 'fuel', data: CostPerMonth[]}>;
  updateType: 'single' | 'repeating' | 'fuel';

  singleCostTypes = [
    {text: 'Repair', value: 'Repair'},
    {text: 'Normal Purchase', value: 'Normal Purchase'},
    {text: 'Administrative Expenses', value: 'Administrative Expenses'},
    {text: 'Other', value: 'Other'}
  ];

  fuelTypes = [
    {text: 'Super Plus', value: 'Super Plus'},
    {text: 'Super', value: 'Super'},
    {text: 'E10', value: 'E10'},
    {text: 'Diesel', value: 'Diesel'},
  ];



  constructor(
    private api: ApiService,
    private auth: AuthService
  ) {
    this.unloadCosts();
    this.costPerMonth = new Subject<{type: 'single' | 'repeating' | 'fuel'; data: CostPerMonth[]}>();
  }

  loadCosts(vin: string) {
    const username = this.auth.username;

    this.api.getSingleCosts(username, vin).subscribe(
      value => {

        for (const datum of value.data) {
          datum.date = new Date(datum.date);
        }

        this.costs.single = value.data;
        this.costPerMonth.next({type: 'single', data: this.getCostPerMonth(value.data)});
      }
    );
    this.api.getRepeatingCosts(username, vin).subscribe(
      value => {

        for (const datum of value.data) {
          datum.date = new Date(datum.date);
        }

        this.costs.repeating = value.data;
        this.costPerMonth.next({type: 'repeating', data: this.getCostPerMonth(value.data)});
      }
    );
    this.api.getFuelCosts(username, vin).subscribe(
      value => {

        for (const datum of value.data) {
          datum.date = new Date(datum.date);
        }

        this.costs.fuel = value.data;
        this.costPerMonth.next({type: 'fuel', data: this.getCostPerMonth(value.data)});
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

  getCostPerMonth(costs: SingleCostItem[] | RepeatingCostItem[] | FuelCostItem[]): CostPerMonth[] {
    let result: CostPerMonth[] = [];

    for (const cost of costs) {
      let found = false;
      for (const costPerMonth of result) {

        if (
          costPerMonth.date.getMonth() === cost.date.getMonth()
          && costPerMonth.date.getFullYear() === cost.date.getFullYear()
        ) {
          costPerMonth.costs += cost.price;
          found = true;
        }
      }
      if (!found) {
        result.push({date: cost.date, costs: cost.price});
      }
    }

    result.sort((a, b) => a.date.getTime() - b.date.getTime());

    return result;
  }
}

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

  // Important: Index is used for sorting!
  repeatingPeriods = [
    {text: 'Yearly', value: 'Yearly'},
    {text: 'Half a year', value: 'Half a year'},
    {text: 'Quarter', value: 'Quarter'},
    {text: 'Monthly', value: 'Monthly'},
    {text: 'Weekly', value: 'Weekly'},
    {text: 'Daily', value: 'Daily'},
  ];



  constructor(
    private api: ApiService,
    private auth: AuthService
  ) {
    this.unloadCosts();
    this.costPerMonth = new Subject<{type: 'single' | 'repeating' | 'fuel', data: CostPerMonth[]}>();
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
   * Only loading the Single Costs
   * @param vin
   */
  loadSingle(vin: string): Promise<SingleCostItem[]> {
    const username = this.auth.username;
    return new Promise<SingleCostItem[]>(resolve => {
      this.api.getSingleCosts(username, vin).subscribe(
        value => {

          for (const datum of value.data) {
            datum.date = new Date(datum.date);
          }

          resolve(value.data);
        },
        error => resolve([])
      );
    });
  }

  /**
   * Only loading the Repeating Costs
   * @param vin
   */
  loadRepeat(vin: string): Promise<RepeatingCostItem[]> {
    const username = this.auth.username;
    return new Promise<RepeatingCostItem[]>(resolve => {
      this.api.getRepeatingCosts(username, vin).subscribe(
        value => {

          for (const datum of value.data) {
            datum.date = new Date(datum.date);
          }

          resolve(value.data);
        },
        error => resolve([])
      );
    });
  }

  /**
   * Only loading the Fuel Costs
   * @param vin
   */
  loadFuel(vin: string): Promise<FuelCostItem[]> {
    const username = this.auth.username;
    return new Promise<FuelCostItem[]>(resolve => {
      this.api.getFuelCosts(username, vin).subscribe(
        value => {

          for (const datum of value.data) {
            datum.date = new Date(datum.date);
          }

          resolve(value.data);
        },
        error => resolve([])
      );
    });
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

  /**
   * Get costs per month for stats
   * @param costs
   */
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

  /**
   * Get the sum of the given costs
   * @param costs
   */
  getSumOfCosts(costs: FuelCostItem[] | SingleCostItem[] | RepeatingCostItem[]): number {
    let sum = 0;

    for (const cost of costs) {
      sum += cost.price;
    }

    return sum;
  }

  /**
   * Get the sum of driven distance
   * @param costs
   */
  getSumOfDistance(costs: FuelCostItem[]): number {
    let sum = 0;

    for (const cost of costs) {
      sum += cost.km;
    }

    return sum;
  }

  /**
   * Get the highest price of the given costs
   * @param costs
   */
  getHighestPrice(costs: FuelCostItem[] | SingleCostItem[] | RepeatingCostItem[]): number {
    let highest = 0;

    for (const cost of costs) {
      highest < cost.price? highest = cost.price : undefined;
    }

    return highest;
  }
}

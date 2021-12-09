import { Injectable } from '@angular/core';
import {
  AllCostsPerMonth,
  CostPerMonth,
  CostPerMonthBuffer,
  FuelCostItem,
  RepeatingCostItem,
  SingleCostItem
} from '../../models/cost.model';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostService {
  costs: {single: SingleCostItem[], repeating: RepeatingCostItem[], fuel: FuelCostItem[]};
  loaded: {single: boolean, repeating: boolean, fuel: boolean};
  costPerMonth: Subject<CostPerMonthBuffer>;
  allCostsPerMonth: Subject<AllCostsPerMonth[]>;
  updateType: 'single' | 'repeating' | 'fuel';
  dataBuffer: CostPerMonthBuffer[];

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
    this.allCostsPerMonth = new Subject<AllCostsPerMonth[]>();
  }

  /**
   * Loads all costs
   * @param vin
   */
  loadCosts(vin: string) {
    this.loaded = {
      single: false,
      repeating: false,
      fuel: false
    };

    const username = this.auth.username;

    // load single costs
    this.api.getSingleCosts(username, vin).subscribe(
      value => {

        for (const datum of value.data) {
          datum.date = new Date(datum.date);
        }

        this.costs.single = value.data;
        this.loaded.single = true;
        this.costPerMonth.next({type: 'single', data: this.getCostPerMonth(value.data)});
      }
    );

    // load Repeating costs
    this.api.getRepeatingCosts(username, vin).subscribe(
      value => {

        for (const datum of value.data) {
          datum.date = new Date(datum.date);
        }

        this.costs.repeating = value.data;
        this.loaded.repeating = true;
        this.costPerMonth.next({type: 'repeating', data: this.getCostPerMonth(value.data)});
      }
    );

    // load Fuel costs
    this.api.getFuelCosts(username, vin).subscribe(
      value => {
        for (const datum of value.data) {
          datum.date = new Date(datum.date);
        }

        this.costs.fuel = value.data;
        this.loaded.fuel = true;
        this.costPerMonth.next({type: 'fuel', data: this.getCostPerMonth(value.data)});
      }
    );

    // Wait for completing the loading of every dataset
    this.dataBuffer = [
      {type: 'single', data: []},
      {type: 'fuel', data: []},
      {type: 'repeating', data: []},
    ];

    let existsData = false; // Show if there exist any data

    // Init all cost per Month
    this.costPerMonth.subscribe(data => {
      console.log(data);
      // Get all actual Data into the buffer
      for (const i in this.dataBuffer) {
        if(this.dataBuffer[i].type === data.type) {
          this.dataBuffer[i].data = data.data;

          if (data.data.length > 0) {
            console.log(data.data.length);
            existsData = true;
          }
        }
      }
      console.log(this.loaded, existsData);
      // Only if all cost types are loaded
      if (
        this.loaded.single
        && this.loaded.repeating
        && this.loaded.fuel
        && existsData
      ) {
        console.log('Buffer', this.dataBuffer);
        this.allCostsPerMonth.next(this.getAllCostsPerMonth());
      }
    });
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
   * Generating all cost per month object
   * @private
   */
  private getAllCostsPerMonth(): AllCostsPerMonth[]  {
    let result: AllCostsPerMonth[] = [];
    // Go through the rows single, then fuel, then repeating
    for (const row of this.dataBuffer) {
      // Go through the new data
      for (const newDatum of row.data) {

        // First data
        if(result.length === 0) {
          result.push({date: newDatum.date, data: [{type: row.type, costs: newDatum.costs}]});
        } else {
          let added = false;

          // Go through existing data
          for (const i in result) {
            // Date exists -> push only a new data set
            if(
              newDatum.date.getMonth() === result[i].date.getMonth()
              && newDatum.date.getFullYear() === result[i].date.getFullYear()
            ) {
              result[i].data.push({type: row.type, costs: newDatum.costs});
              added = true;
            }
          }

          // Date doesn't exist -> new entry with date
          if (!added) {
            result.push({date: newDatum.date, data: [{type: row.type, costs: newDatum.costs}]});
          }
        }
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

import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Vehicle} from '../../models/vehicle.model';
import {ApiService} from '../../core/services/api.service';
import {Router} from '@angular/router';
import {LastRouteService} from '../../core/services/last-route.service';
import {CostService} from '../../core/services/cost.service';
import de from "@angular/common/locales/de";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit {
  vehicles: Vehicle[];
  stats: {
    numOfVehicles: number,
    sum: number,
    distance: number,
    highest: number,
    averagePerCar: number
  }


  constructor(
    public auth: AuthService,
    private api: ApiService,
    private route: Router,
    private lastRoute: LastRouteService,
    private costService: CostService
  ) {

  }

  ngOnInit(): void {
    this.stats = {
      numOfVehicles: 0,
        sum: 0,
        distance: 0,
        highest: 0,
        averagePerCar: 0
    };
    this.vehicles = [];
    this.loadVehicles().then( value => {
      this.vehicles = value;
      this.getStats().then();
    });
    this.lastRoute.newUrlString('/overview');

  }

  /**
   * Loads the vehicles from the api
   */
  loadVehicles(): Promise<Vehicle[]> {
    return new Promise<Vehicle[]>( resolve => {
      this.api.getVehicles(this.auth.username).subscribe(result => {
          resolve(result.data);
        },
        error => {
          if (error.code === 403) {
            this.auth.handleAuthError(error);
          } else {
            resolve(null);
            throw(error);
          }
        });
    });

  }

  /**
   * Navigate to addVehicle
   */
  addVehicle() {
    this.route.navigate(['overview/addVehicle']).then();
  }

  /**
   * Handles the delete of a vehicle
   * @param deleted
   */
  deleteHandler(deleted: boolean) {
    if (deleted) {
      this.loadVehicles().then(value => {
        this.vehicles = value;
        this.getStats().then();
      });
    }
  }

  /**
   * Get the statistic data for the overview
   * @private
   */
  private async getStats(): Promise<void> {
    let sum = 0;
    let highestPrice = 0;
    let distance = 0;
    let sumVehicle = 0;
    let averageCosts = 0;

    for (const vehicle of this.vehicles) {
      // Fetch data
      const single = await this.costService.loadSingle(vehicle.vin);
      const repeating = await this.costService.loadRepeat(vehicle.vin);
      const fuel = await this.costService.loadFuel(vehicle.vin);

      // Sum
      sum += this.costService.getSumOfCosts(single);
      sum += this.costService.getSumOfCosts(repeating);
      sum += this.costService.getSumOfCosts(fuel);

      // Distance
      distance += this.costService.getSumOfDistance(fuel);

      // Highest price
      const highestSingle = this.costService.getHighestPrice(single);
      const highestRepeating= this.costService.getHighestPrice(repeating);
      const highestFuel = this.costService.getHighestPrice(fuel);

      highestPrice < highestSingle? highestPrice = highestSingle : undefined;
      highestPrice < highestRepeating? highestPrice = highestRepeating : undefined;
      highestPrice < highestFuel? highestPrice = highestFuel : undefined;
    }

    sumVehicle = this.vehicles.length;
    sumVehicle > 0? averageCosts = sum / sumVehicle: averageCosts = 0;

    this.stats =  {
      numOfVehicles: sumVehicle,
      sum: sum,
      distance: distance,
      highest: highestPrice,
      averagePerCar: averageCosts
    };
  }


}

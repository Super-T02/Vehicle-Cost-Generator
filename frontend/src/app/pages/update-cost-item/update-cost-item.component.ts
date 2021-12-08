import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../models/cost.model';
import {Observable, Subject} from 'rxjs';
import {ApiService} from '../../core/services/api.service';
import {AuthService} from '../../core/services/auth.service';
import {CostService} from '../../core/services/cost.service';
import {LastRouteService} from '../../core/services/last-route.service';

@Component({
  selector: 'app-update-cost-item',
  templateUrl: './update-cost-item.component.html',
  styleUrls: ['./update-cost-item.component.less']
})
export class UpdateCostItemComponent implements OnInit {

  vin: string;
  id: string;
  item: Subject<SingleCostItem | FuelCostItem | RepeatingCostItem>
    = new Subject<SingleCostItem | FuelCostItem | RepeatingCostItem>();
  query: Object;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private costService: CostService,
    private lastRoute: LastRouteService
  ) { }

  ngOnInit(): void {
    this.query = this.lastRoute.query;
    this.route.params.subscribe(parms => {
      this.vin = parms.vin.toUpperCase();
      this.id = parms.id;
      switch (this.costService.updateType) {
        case 'single':
          this.api.getSingleCost(this.auth.username, this.vin, this.id).subscribe(
            res => {
              this.item.next(res.data[0]);
            }
          );
          break;
        case 'repeating':
          this.api.getRepeatingCost(this.auth.username, this.vin, this.id).subscribe(
            res => {
              this.item.next(res.data[0]);
            }
          );
          break;
        case 'fuel':
          this.api.getFuelCost(this.auth.username, this.vin, this.id).subscribe(
            res => {
              this.item.next(res.data[0]);
            }
          );
          break;
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../models/cost.model';
import {Subject} from 'rxjs';
import {ApiService} from '../../core/services/api.service';
import {AuthService} from '../../core/services/auth.service';
import {CostService} from '../../core/services/cost.service';
import {UtilService} from '../../core/services/util.service';

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
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.query = {selected: this.util.lastCostSelected};
    this.route.params.subscribe(params => {
      this.vin = params.vin.toUpperCase();
      this.id = params.id;
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

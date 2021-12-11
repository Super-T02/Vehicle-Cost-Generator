import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CostService} from '../../core/services/cost.service';
import {LastRouteService} from '../../core/services/last-route.service';
import {UtilService} from '../../core/services/util.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.less']
})
export class CostsComponent implements OnInit, OnDestroy {

  vin: string;
  lastSelected: number;

  constructor(
    private costs: CostService,
    private route: ActivatedRoute,
    private lastUrl: LastRouteService,
    public util: UtilService,
  ) { }

  ngOnInit(): void {
    this.lastSelected = this.util.lastCostSelected;
    this.route.params.subscribe(parms => {
      this.vin = parms.vin.toUpperCase();
      this.costs.loadCosts(this.vin);
    });

    this.route.queryParams.subscribe(query => {
      if (query.selected && this.lastSelected === 0) {
        this.util.lastCostSelected = query.selected;
      }
      this.lastUrl.newUrlString(`/overview/${this.vin}`);
    });
  }

  ngOnDestroy(): void{
    this.util.lastCostSelected = this.lastSelected;
  }

  /**
   * Changes the selected Input and change last URL
   * @param $event
   */
  changedInput($event: number) {
    this.util.lastCostSelected = $event;
    this.lastUrl.query = {selected: this.util.lastCostSelected};
    this.lastUrl.newUrlString(`/overview/${this.vin}`);
  }
}

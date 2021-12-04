import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CostService} from '../../core/services/cost.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.less']
})
export class CostsComponent implements OnInit {

  vin: string

  constructor(
    private costs: CostService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => {
      this.vin = parms.vin.toUpperCase();
      this.costs.loadCosts(this.vin);
    });
  }

}

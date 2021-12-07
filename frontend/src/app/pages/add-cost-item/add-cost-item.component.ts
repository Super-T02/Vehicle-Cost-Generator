import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LastRouteService} from '../../core/services/last-route.service';

@Component({
  selector: 'app-add-cost-item',
  templateUrl: './add-cost-item.component.html',
  styleUrls: ['./add-cost-item.component.less']
})
export class AddCostItemComponent implements OnInit {

  vin: string;
  query: Object;

  constructor(
    private route: ActivatedRoute,
    private lastRoute: LastRouteService
  ) { }

  ngOnInit(): void {
    this.query = this.lastRoute.query;
    this.route.params.subscribe(parms => {
      this.vin = parms.vin.toUpperCase();
    });
  }

}

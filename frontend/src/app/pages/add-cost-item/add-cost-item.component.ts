import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../../core/services/util.service';

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
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.query = {selected: this.util.lastCostSelected};
    this.route.params.subscribe(params => {
      this.vin = params.vin.toUpperCase();
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-cost-item',
  templateUrl: './add-cost-item.component.html',
  styleUrls: ['./add-cost-item.component.less']
})
export class AddCostItemComponent implements OnInit {

  vin: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => {
      this.vin = parms.vin.toUpperCase();
    });
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {CostService} from '../../../core/services/cost.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-single-costs',
  templateUrl: './single-costs.component.html',
  styleUrls: ['./single-costs.component.less']
})
export class SingleCostsComponent implements OnInit {

  vin: string;

  constructor(
    public costService: CostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.vin = params.vin.toUpperCase()
    );
  }

  addSingleCost() {
    this.router.navigate(['overview/'+ this.vin +'/addCostItem']).then();
  }
}

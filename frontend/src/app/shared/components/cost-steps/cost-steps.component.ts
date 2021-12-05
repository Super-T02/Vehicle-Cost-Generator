import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MEDIA_BREAKPOINTS} from '../../../../environments/constants';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cost-steps',
  templateUrl: './cost-steps.component.html',
  styleUrls: ['./cost-steps.component.less']
})
export class CostStepsComponent implements OnInit {

  @Input() item: Observable<SingleCostItem | FuelCostItem | RepeatingCostItem>;
  @Input() deliverData: boolean = false;
  @Input() vin: string;
  @Input() type: 'single' | 'repeating' | 'fuel' = 'single';



  breakPoints = MEDIA_BREAKPOINTS;
  currentStep = 0;
  countdown = 0;
  retries = 0;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  dataSent(value: boolean) {
    if (value) {
      this.currentStep = 1;

      this.countdown = 5;

      // Interval for the timer
      setInterval(() => {
        this.countdown > 0 ? this.countdown -- : undefined;
      },1000);

      // Auto redirect
      setTimeout(() => {
        this.router.navigate(['overview/' + this.vin]).then();
      },5000);
    }
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MEDIA_BREAKPOINTS} from '../../../../environments/constants';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';
import {Router} from '@angular/router';
import {CostService} from '../../../core/services/cost.service';
import {LastRouteService} from '../../../core/services/last-route.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cost-steps',
  templateUrl: './cost-steps.component.html',
  styleUrls: ['./cost-steps.component.less']
})
export class CostStepsComponent implements OnInit {

  @Input() item: Observable<SingleCostItem | FuelCostItem | RepeatingCostItem>;
  @Input() deliverData: boolean = false;
  @Input() vin: string;

  breakPoints = MEDIA_BREAKPOINTS;
  currentStep = 0;
  countdown = 0;
  retries = 0;

  constructor(
    private router: Router,
    public costService: CostService,
    private lastUrl: LastRouteService,
    private message: NzMessageService
  ) {

  }

  ngOnInit(): void {
  }

  dataSent(value: boolean) {
    if (value) {
      this.currentStep = 1;
      this.countdown = 3;
      let successMessage: string;

      this.deliverData? successMessage='Cost item successfully updated!'
        : successMessage='Cost item successfully created!';
      this.message.success(successMessage, {nzDuration: 3000});

      // Interval for the timer
      setInterval(() => {
        this.countdown > 0 ? this.countdown -- : undefined;
      },1000);

      // Auto redirect
      setTimeout(() => {
        this.router.navigate(['overview/' + this.vin], {
          queryParams: this.lastUrl.query,
          queryParamsHandling: 'merge'
        }).then();
      },this.countdown * 1000);
    }
  }

}

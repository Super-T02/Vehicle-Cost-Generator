import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MEDIA_BREAKPOINTS} from '../../../../environments/constants';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';

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

  constructor() { }

  ngOnInit(): void {
  }

}

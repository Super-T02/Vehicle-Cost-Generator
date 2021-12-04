import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';

@Component({
  selector: 'app-fuel-cost-form',
  templateUrl: './fuel-cost-form.component.html',
  styleUrls: ['./fuel-cost-form.component.less']
})
export class FuelCostFormComponent implements OnInit {

  @Input() item: Observable<SingleCostItem | FuelCostItem | RepeatingCostItem>;
  @Input() deliverData: boolean = false;
  @Input() vin: string;

  addFuel: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addFuel = this.fb.group({
      price: [null, Validators.required],
      date: [null, Validators.required],
      volume: [null, Validators.required],
      consumption: [null],
      km: [null],
      type: [null]
    });
  }

}

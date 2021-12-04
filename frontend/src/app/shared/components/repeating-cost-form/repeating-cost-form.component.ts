import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';

@Component({
  selector: 'app-repeating-cost-form',
  templateUrl: './repeating-cost-form.component.html',
  styleUrls: ['./repeating-cost-form.component.less']
})
export class RepeatingCostFormComponent implements OnInit {

  @Input() item: Observable<SingleCostItem | FuelCostItem | RepeatingCostItem>;
  @Input() deliverData: boolean = false;
  @Input() vin: string;

  addRepeat: FormGroup;

  constructor(
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.addRepeat = this.fb.group({
      price: [null, Validators.required],
      date: [null, Validators.required],
      period: [null, Validators.required],
      name: [null, Validators.required],
      description: [null]
    });
  }

}

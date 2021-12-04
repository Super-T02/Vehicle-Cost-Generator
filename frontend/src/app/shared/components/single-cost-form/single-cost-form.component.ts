import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';

@Component({
  selector: 'app-single-cost-form',
  templateUrl: './single-cost-form.component.html',
  styleUrls: ['./single-cost-form.component.less', '../../styles/form-style.less']
})
export class SingleCostFormComponent implements OnInit {

  @Input() item: Observable<SingleCostItem | FuelCostItem | RepeatingCostItem>;
  @Input() deliverData: boolean = false;
  @Input() vin: string;

  addSingle: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addSingle = this.fb.group({
      name: [null, Validators.required],
      date: [null, Validators.required],
      type: [null, Validators.required], // TODO: As select !
      price: [null, Validators.required],
      km: [null],
      description: [null]
    });
  }

  onSubmit() {

  }
}

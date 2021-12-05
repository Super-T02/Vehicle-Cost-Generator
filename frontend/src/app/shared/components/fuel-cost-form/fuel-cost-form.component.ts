import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';
import {ApiService} from '../../../core/services/api.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-fuel-cost-form',
  templateUrl: './fuel-cost-form.component.html',
  styleUrls: ['./fuel-cost-form.component.less']
})
export class FuelCostFormComponent implements OnInit {

  @Input() item: Observable<SingleCostItem | FuelCostItem | RepeatingCostItem>;
  @Input() deliverData: boolean = false;
  @Input() vin: string;
  @Output() sentData = new EventEmitter<boolean>();

  addFuel: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService
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

  /**
   * Handles the submit event for the form
   */
  onSubmit() {
    // Validate Form
    for (const i in this.addFuel.controls) {
      if (this.addFuel.controls.hasOwnProperty(i)) {
        this.addFuel.controls[i].markAsDirty();
        this.addFuel.controls[i].updateValueAndValidity();
      }
    }

    // Send data to api
    this.api.createFuelCostItem(this.addFuel.value, this.auth.username, this.vin)
      .subscribe(
        () => {
          this.sentData.emit(true);
        },
        err => {
          this.sentData.emit(false);
          return throwError(err);
        }
      );
  }

}

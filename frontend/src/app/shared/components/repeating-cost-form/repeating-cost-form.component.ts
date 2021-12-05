import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';
import {ApiService} from '../../../core/services/api.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-repeating-cost-form',
  templateUrl: './repeating-cost-form.component.html',
  styleUrls: ['./repeating-cost-form.component.less']
})
export class RepeatingCostFormComponent implements OnInit {

  @Input() item: Observable<SingleCostItem | FuelCostItem | RepeatingCostItem>;
  @Input() deliverData: boolean = false;
  @Input() vin: string;
  @Output() sentData = new EventEmitter<boolean>();

  addRepeat: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService
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

  /**
   * Handles Submit of repeating costs form
   */
  onSubmit() {
    // Validate Form
    for (const i in this.addRepeat.controls) {
      if (this.addRepeat.controls.hasOwnProperty(i)) {
        this.addRepeat.controls[i].markAsDirty();
        this.addRepeat.controls[i].updateValueAndValidity();
      }
    }

    // Send data to api
    this.api.createRepeatingCostItem(this.addRepeat.value, this.auth.username, this.vin)
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

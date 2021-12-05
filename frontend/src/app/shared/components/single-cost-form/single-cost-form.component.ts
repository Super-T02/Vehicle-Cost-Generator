import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';
import {ApiService} from '../../../core/services/api.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-single-cost-form',
  templateUrl: './single-cost-form.component.html',
  styleUrls: ['./single-cost-form.component.less', '../../styles/form-style.less']
})
export class SingleCostFormComponent implements OnInit {

  @Input() item: Observable<SingleCostItem | FuelCostItem | RepeatingCostItem>;
  @Input() deliverData: boolean = false;
  @Input() vin: string;
  @Output() sentData = new EventEmitter<boolean>();

  addSingle: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService
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

  /**
   * Handles the submit event for the form
   */
  onSubmit() {
    // Validate Form
    for (const i in this.addSingle.controls) {
      if (this.addSingle.controls.hasOwnProperty(i)) {
        this.addSingle.controls[i].markAsDirty();
        this.addSingle.controls[i].updateValueAndValidity();
      }
    }

    // Send data to api
    this.api.createSingleCostItem(this.addSingle.value, this.auth.username, this.vin)
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

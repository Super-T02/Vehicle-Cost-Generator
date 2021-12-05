import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';
import {ApiService} from '../../../core/services/api.service';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {CostService} from '../../../core/services/cost.service';
import {ApiError} from '../../../models/api.model';

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
  costItem: FuelCostItem;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private costService: CostService
  ) { }

  ngOnInit(): void {
    if(this.deliverData && this.costService.updateType != 'fuel') {
      this.router.navigate(['./404']).then();
    }

    this.addFuel = this.fb.group({
      price: [null, Validators.required],
      date: [null, Validators.required],
      volume: [null, Validators.required],
      consumption: [null],
      km: [null],
      type: [null]
    });

    if (this.deliverData) {
      this.item.subscribe(data => {
        data = data as FuelCostItem;
        this.costItem = data;
        this.addFuel.setValue({
          price: data.price,
          date: data.date,
          volume: data.volume,
          consumption: data.consumption,
          km: data.km,
          type: data.type
        });
      });
    }
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

    // Update Cost Item
    if (this.deliverData) {
      // Build result
      const result = this.addFuel.value;
      result.vin = this.costItem.vin;
      result.id = this.costItem.id;
      result.username = this.costItem.username;

      // Send data to api
      this.api.updateFuelCostItem(result.vin, result.username, result.id, result).subscribe(
        () => this.handleResponse(),
        err => this.handleError(err),
      );

    } else { // New Cost Item
      // Send data to api
      this.api.createFuelCostItem(this.addFuel.value, this.auth.username, this.vin)
        .subscribe(
          () => this.handleResponse(),
          err => this.handleError(err)
      );
    }
  }

  /**
   * Handle Updates and Creates responses
   */
  handleResponse(): void {
    this.sentData.emit(true);
  }

  /**
   * Handles api errors of requests
   * @param err
   */
  handleError(err: ApiError): void {
    this.sentData.emit(false);
    throwError(err);
  }

}

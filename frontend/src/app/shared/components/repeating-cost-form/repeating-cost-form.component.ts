import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';
import {ApiService} from '../../../core/services/api.service';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {CostService} from '../../../core/services/cost.service';
import {ApiError} from '../../../models/api.model';
import {ResizeService} from '../../../core/services/resize.service';

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
  costItem: RepeatingCostItem;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    public costService: CostService,
    public resize: ResizeService
    ) { }

  ngOnInit(): void {

    if(this.deliverData && this.costService.updateType != 'repeating') {
      this.router.navigate(['./404']).then();
    }

    this.addRepeat = this.fb.group({
      price: [null, Validators.required],
      date: [null, Validators.required],
      period: [null, Validators.required],
      name: [null, Validators.required],
      description: [null]
    });

    if (this.deliverData) {
      this.item.subscribe(data => {
        data = data as RepeatingCostItem;
        this.costItem = data;

        this.addRepeat.setValue({
          price: data.price,
          date: data.date,
          period: data.period,
          name: data.name,
          description: data.description
        });
      });
    }
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

    // Update Cost Item
    if (this.deliverData) {
      // Build result
      const result = this.addRepeat.value;
      result.vin = this.costItem.vin;
      result.id = this.costItem.id;
      result.username = this.costItem.username;

      // Send data to api
      this.api.updateRepeatingCostItem(result.vin, result.username, result.id, result).subscribe(
        () => this.handleResponse(),
        err => this.handleError(err),
      );

    } else { // New Cost Item
      // Send data to api
      this.api.createRepeatingCostItem(this.addRepeat.value, this.auth.username, this.vin)
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
    this.auth.handleAuthError(err);
    throwError(err);
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {FuelCostItem, RepeatingCostItem, SingleCostItem} from '../../../models/cost.model';
import {ApiService} from '../../../core/services/api.service';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {CostService} from '../../../core/services/cost.service';
import {ApiError} from '../../../models/api.model';
import {ResizeService} from '../../../core/services/resize.service';

@Component({
  selector: 'app-single-cost-form',
  templateUrl: './single-cost-form.component.html',
  styleUrls: ['./single-cost-form.component.less', '../../styles/form-style.less']
})
export class SingleCostFormComponent implements OnInit {

  @Input() item: Observable<SingleCostItem | FuelCostItem | RepeatingCostItem >;
  @Input() deliverData: boolean = false;
  @Input() vin: string;
  @Output() sentData = new EventEmitter<boolean>();

  addSingle: UntypedFormGroup;
  costItem: SingleCostItem;

  constructor(
    private fb: UntypedFormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    public costService: CostService,
    public resize: ResizeService
  ) { }

  ngOnInit(): void {

    if(this.deliverData && this.costService.updateType != 'single') {
      this.router.navigate(['./404']).then();
    }

    this.addSingle = this.fb.group({
      name: [null, Validators.required],
      date: [null, Validators.required],
      type: [null, Validators.required],
      price: [null, Validators.required],
      km: [null],
      description: [null]
    });

    if (this.deliverData) {
      this.item.subscribe(data => {
        data = data as SingleCostItem;
        this.costItem = data;
        this.addSingle.setValue({
          name: data.name,
          date: data.date,
          type: data.type,
          price: data.price,
          km: data.km,
          description: data.description
        });
      });
    }
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

    // Update Cost Item
    if (this.deliverData) {
      // Build result
      const result = this.addSingle.value;
      result.vin = this.costItem.vin;
      result.id = this.costItem.id;
      result.username = this.costItem.username;

      // Send data to api
      this.api.updateSingleCostItem(result.vin, result.username, result.id, result).subscribe(
        () => this.handleResponse(),
        err => this.handleError(err),
      );

    } else { // New Cost Item
      // Send data to api
      this.api.createSingleCostItem(this.addSingle.value, this.auth.username, this.vin)
        .subscribe(
          () => this.handleResponse(),
          err => this.handleError(err),
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

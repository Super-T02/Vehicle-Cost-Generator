import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MEDIA_BREAKPOINTS} from '../../../../environments/constants';
import {Vehicle, VehicleInput} from '../../../models/vehicle.model';
import {ResizeService} from '../../../core/services/resize.service';
import {ApiService} from '../../../core/services/api.service';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {ApiError} from '../../../models/api.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-vehicle-steps',
  templateUrl: './vehicle-steps.component.html',
  styleUrls: ['./vehicle-steps.component.less']
})
export class VehicleStepsComponent implements OnInit {
  @Input() vehicle: Observable<Vehicle>;
  @Input() deliverData: boolean = false;
  vin: string;

  addVehicle: FormGroup;
  addVehicleRequire: FormGroup;
  breakPoints = MEDIA_BREAKPOINTS;
  currentStep = 0;
  countdown = 0;
  retries = 0; //num of retries
  buffer: VehicleInput; // Buffers the data of the first form

  constructor(
    private fb: FormBuilder,
    public resize: ResizeService,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.addVehicleRequire = this.fb.group({
      vin: [null, Validators.required],
      name: [null, Validators.required],
      make: [null, Validators.required],
      license: [null],
      model: [null],
    });

    this.addVehicle = this.fb.group({
      year: [null],
      type: [null],
      color: [null],
      weight: [null, Validators.min(0)],
    });

    if (this.deliverData) {
      this.addVehicleRequire.controls['vin'].disable();
      this.vehicle.subscribe(value => {
        this.vin = value.vin;
        this.addVehicleRequire.setValue({
          vin: value.vin,
          name: value.name,
          make: value.make,
          license: value.license,
          model: value.model,
        });

        this.addVehicle.setValue({
          year: value.year,
          type: value.type,
          color: value.color,
          weight: value.weight,
        });
      });

    }
  }

  /**
   * Submit of the required data
   */
  onSubmitFirst(): void {
    // Validate Form
    for (const i in this.addVehicleRequire.controls) {
      if (this.addVehicleRequire.controls.hasOwnProperty(i)) {
        this.addVehicleRequire.controls[i].markAsDirty();
        this.addVehicleRequire.controls[i].updateValueAndValidity();
      }
    }

    this.buffer = this.addVehicleRequire.value;
    this.currentStep += 1;
  }

  /**
   * Submit for adding the car
   */
  onSubmitSecond(): void {
    // Validate Form
    for (const i in this.addVehicle.controls) {
      if (this.addVehicle.controls.hasOwnProperty(i)) {
        this.addVehicle.controls[i].markAsDirty();
        this.addVehicle.controls[i].updateValueAndValidity();
      }
    }
    const {value} = this.addVehicle;

    // Build the result
    const result: VehicleInput = {
      vin: this.buffer.vin,
      name: this.buffer.name,
      make: this.buffer.make,
      model: this.buffer.model,
      license: this.buffer.license,
      year: value.year,
      type: value.type,
      color: value.color,
      weight: value.weight
    };

    this.addVehicle.disabled;

    if (this.deliverData) {
      // generate vehicle with username
      const vehicle: Vehicle = {
        vin: this.vin,
        username: this.auth.username,
        name: result.name,
        make: result.make,
        model: result.model,
        license: result.license,
        year: result.year.toString(),
        type: result.type,
        color: result.color,
        weight: result.weight
      };

      this.api.updateVehicle(vehicle.vin, vehicle.username, vehicle).subscribe(
        () => this.handleResult(),
        error => this.handleError(error)
      );
    } else {
      this.api.createVehicle(result, this.auth.username).subscribe(
      () => this.handleResult(),
      error => this.handleError(error)
      );
    }
  }

  /**
   * Handles the result
   */
  handleResult(): void {
    this.currentStep += 1;
    this.countdown = 5;

    // Interval for the timer
    setInterval(() => {
      this.countdown > 0 ? this.countdown -- : undefined;
    },1000);

    // Auto redirect
    setTimeout(() => {
      this.router.navigate(['overview']).then();
    },5000);
  }

  /**
   * Handles the error
   * @param error
   */
  handleError(error: ApiError): void {
    if (error.code === 403) {
      this.auth.handleAuthError(error);
    } else if (error.code === 400) {
      this.currentStep = 0;
      throw(error);
    } else {
      throw(error);
    }
  }

  /**
   * Go back
   */
  pre(): void {
    this.currentStep -= 1;
  }

  /**
   * Format to kg
   * @param value
   */
  formatterKG = (value: number): string => `${value} kg`;

  /**
   * Parse kg in number
   * @param value
   */
  parserKG = (value: string): string => value.replace(' kg', '');

}

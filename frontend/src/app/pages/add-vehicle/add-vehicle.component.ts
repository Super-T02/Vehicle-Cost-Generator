import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VehicleInput} from '../../models/vehicle.model';
import {ResizeService} from '../../core/services/resize.service';
import {MEDIA_BREAKPOINTS} from '../../../environments/constants';
import {ApiService} from '../../core/services/api.service';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.less']
})
export class AddVehicleComponent implements OnInit {

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

    this.api.createVehicle(result, this.auth.username).subscribe(
    result => {
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
    },
    error => {
      if (error.code === 403) {
        this.auth.handleAuthError(error);
      } else if (error.code === 400) {
        this.currentStep = 0;
        throw(error);
      } else {
        throw(error);
      }
    });
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

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VehicleInput} from '../../models/vehicle.model';
import {ResizeService} from '../../core/services/resize.service';
import {MEDIA_BREAKPOINTS} from '../../../environments/constants';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.less']
})
export class AddVehicleComponent implements OnInit {

  addVehicle: FormGroup;
  addVehicleRequire: FormGroup;
  currentStep = 0;
  buffer: VehicleInput;
  breakPoints = MEDIA_BREAKPOINTS;

  constructor(
    private fb: FormBuilder,
    public resize: ResizeService
  ) { }

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

  onSubmitFirst(): void {
    // Validate Form
    for (const i in this.addVehicleRequire.controls) {
      if (this.addVehicleRequire.controls.hasOwnProperty(i)) {
        this.addVehicleRequire.controls[i].markAsDirty();
        this.addVehicleRequire.controls[i].updateValueAndValidity();
      }
    }

    this.buffer = this.addVehicleRequire.value;
    console.log(this.addVehicleRequire.value);
    this.currentStep += 1;
  }

  onSubmitSecond(): void {
    // Validate Form
    for (const i in this.addVehicle.controls) {
      if (this.addVehicle.controls.hasOwnProperty(i)) {
        this.addVehicle.controls[i].markAsDirty();
        this.addVehicle.controls[i].updateValueAndValidity();
      }
    }
    const {value} = this.addVehicle;

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

    this.currentStep += 1;
    console.log(this.addVehicle.value);
    console.log(result);
  }

  pre(): void {
    this.currentStep -= 1;
  }

  formatterKG = (value: number): string => `${value} kg`;
  parserKG = (value: string): string => value.replace(' kg', '');

}

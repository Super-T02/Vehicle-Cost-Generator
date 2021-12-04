import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './components/singup/signup.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { LoginComponent } from './components/login/login.component';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzResultModule} from "ng-zorro-antd/result";
import {RouterModule} from "@angular/router";
import { VehicleStepsComponent } from './components/vehicle-steps/vehicle-steps.component';
import {NzStepsModule} from "ng-zorro-antd/steps";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzIconModule} from "ng-zorro-antd/icon";
import { CostStepsComponent } from './components/cost-steps/cost-steps.component';
import { SingleCostFormComponent } from './components/single-cost-form/single-cost-form.component';
import { RepeatingCostFormComponent } from './components/repeating-cost-form/repeating-cost-form.component';
import { FuelCostFormComponent } from './components/fuel-cost-form/fuel-cost-form.component';
import {NzSelectModule} from "ng-zorro-antd/select";


@NgModule({
	declarations: [
		SignupComponent,
		LoginComponent,
  VehicleStepsComponent,
  CostStepsComponent,
  SingleCostFormComponent,
  RepeatingCostFormComponent,
  FuelCostFormComponent
	],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzCheckboxModule,
        NzButtonModule,
        NzMessageModule,
        NzResultModule,
        RouterModule,
        NzStepsModule,
        NzDatePickerModule,
        NzIconModule,
        NzSelectModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        SignupComponent,
        LoginComponent,
        VehicleStepsComponent,
        CostStepsComponent
    ]
})
export class SharedModule {
}

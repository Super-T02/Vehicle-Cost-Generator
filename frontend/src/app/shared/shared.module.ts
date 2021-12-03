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


@NgModule({
	declarations: [
		SignupComponent,
		LoginComponent,
  VehicleStepsComponent
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
    NzIconModule
  ],
    exports: [
        CommonModule,
        FormsModule,
        SignupComponent,
        LoginComponent,
        VehicleStepsComponent
    ]
})
export class SharedModule {
}

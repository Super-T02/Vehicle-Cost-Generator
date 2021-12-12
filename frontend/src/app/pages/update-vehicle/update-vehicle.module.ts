import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateVehicleRoutingModule } from './update-vehicle-routing.module';
import { UpdateVehicleComponent } from './update-vehicle.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    UpdateVehicleComponent
  ],
    imports: [
        CommonModule,
        UpdateVehicleRoutingModule,
        NzBreadCrumbModule,
        NzStepsModule,
        SharedModule
    ]
})
export class UpdateVehicleModule { }

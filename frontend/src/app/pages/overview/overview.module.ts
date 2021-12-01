import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import { VehicleComponent } from './vehicle/vehicle.component';
import {NzCardModule} from "ng-zorro-antd/card";


@NgModule({
  declarations: [
    OverviewComponent,
    VehicleComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    NzBreadCrumbModule,
    NzCardModule
  ]
})
export class OverviewModule { }

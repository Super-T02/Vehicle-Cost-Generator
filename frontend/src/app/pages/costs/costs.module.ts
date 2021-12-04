import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostsRoutingModule } from './costs-routing.module';
import { CostsComponent } from './costs.component';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import { SingleCostsComponent } from './single-costs/single-costs.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDividerModule} from "ng-zorro-antd/divider";


@NgModule({
  declarations: [
    CostsComponent,
    SingleCostsComponent
  ],
  imports: [
    CommonModule,
    CostsRoutingModule,
    NzBreadCrumbModule,
    NzTabsModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule
  ]
})
export class CostsModule { }

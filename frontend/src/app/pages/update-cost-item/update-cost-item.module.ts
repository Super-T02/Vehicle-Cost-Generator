import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateCostItemRoutingModule } from './update-cost-item-routing.module';
import { UpdateCostItemComponent } from './update-cost-item.component';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    UpdateCostItemComponent
  ],
  imports: [
    CommonModule,
    UpdateCostItemRoutingModule,
    NzBreadCrumbModule,
    SharedModule
  ]
})
export class UpdateCostItemModule { }

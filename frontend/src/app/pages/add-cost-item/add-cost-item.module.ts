import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCostItemRoutingModule } from './add-cost-item-routing.module';
import { AddCostItemComponent } from './add-cost-item.component';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    AddCostItemComponent
  ],
  imports: [
    CommonModule,
    AddCostItemRoutingModule,
    NzBreadCrumbModule,
    SharedModule
  ]
})
export class AddCostItemModule { }

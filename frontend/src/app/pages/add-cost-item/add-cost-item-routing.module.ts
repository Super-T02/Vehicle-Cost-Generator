import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCostItemComponent } from './add-cost-item.component';

const routes: Routes = [{ path: '', component: AddCostItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCostItemRoutingModule { }

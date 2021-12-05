import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateCostItemComponent } from './update-cost-item.component';

const routes: Routes = [{ path: '', component: UpdateCostItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateCostItemRoutingModule { }

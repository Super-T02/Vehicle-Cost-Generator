import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostsComponent } from './costs.component';
import {CostItemGuardService} from '../../core/guards/cost-item-guard.service';

const routes: Routes = [
  {
    path: '',
    component: CostsComponent
  },
  {
    path: 'addCostItem',
    loadChildren: () => import('../add-cost-item/add-cost-item.module').then(m => m.AddCostItemModule)
  },
  {
    path: 'updateCostItem/:id',
    canActivate: [CostItemGuardService],
    loadChildren: () => import('../update-cost-item/update-cost-item.module').then(m => m.UpdateCostItemModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostsRoutingModule { }

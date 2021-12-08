import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  },
  {
    path: 'addVehicle',
    loadChildren: () => import('../add-vehicle/add-vehicle.module').then(m => m.AddVehicleModule)
  },
  {
    path: 'updateVehicle/:vin',
    loadChildren: () => import('../update-vehicle/update-vehicle.module').then(m => m.UpdateVehicleModule)
  },
  {
    path: ':vin',
    loadChildren: () => import('../costs/costs.module').then(m => m.CostsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }

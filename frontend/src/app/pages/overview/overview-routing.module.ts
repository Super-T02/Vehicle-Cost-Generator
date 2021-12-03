import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';
import {VehicleViewComponent} from './vehicle-view/vehicle-view.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  },
  {
    path: ':vin',
    component: VehicleViewComponent
  },
  {
    path: 'updateVehicle/:vin',
    loadChildren: () => import('../update-vehicle/update-vehicle.module').then(m => m.UpdateVehicleModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }

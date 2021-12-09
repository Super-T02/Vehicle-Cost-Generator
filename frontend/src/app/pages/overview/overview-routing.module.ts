import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';
import {VinGuardService} from '../../core/guards/vin-guard.service';
import {AuthGuardService} from '../../core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  },
  {
    path: 'addVehicle',
    canActivate: [AuthGuardService],
    loadChildren: () => import('../add-vehicle/add-vehicle.module').then(m => m.AddVehicleModule)
  },
  {
    path: 'updateVehicle/:vin',
    canActivate: [AuthGuardService, VinGuardService],
    loadChildren: () => import('../update-vehicle/update-vehicle.module').then(m => m.UpdateVehicleModule)
  },
  {
    path: ':vin',
    canActivate: [AuthGuardService, VinGuardService],
    loadChildren: () => import('../costs/costs.module').then(m => m.CostsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }

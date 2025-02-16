import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateVehicleComponent } from './update-vehicle.component';

const routes: Routes = [{ path: '', component: UpdateVehicleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateVehicleRoutingModule { }

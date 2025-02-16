import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPageRoutingModule } from './signup-page-routing.module';
import { SignupPageComponent } from './signup-page.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {SharedModule} from '../../shared/shared.module';
import {NzStepsModule} from 'ng-zorro-antd/steps';


@NgModule({
  declarations: [
    SignupPageComponent
  ],
    imports: [
        CommonModule,
        SignupPageRoutingModule,
        NzBreadCrumbModule,
        SharedModule,
        NzStepsModule
    ]
})
export class SignupPageModule { }

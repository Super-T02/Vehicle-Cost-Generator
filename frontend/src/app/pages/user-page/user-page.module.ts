import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './user-page.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {SharedModule} from '../../shared/shared.module';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';


@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    NzBreadCrumbModule,
    SharedModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule
  ]
})
export class UserPageModule { }

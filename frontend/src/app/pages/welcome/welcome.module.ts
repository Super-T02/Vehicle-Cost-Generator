import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {SharedModule} from "../../shared/shared.module";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";


@NgModule({
  declarations: [
    WelcomePageComponent
  ],
    imports: [
        SharedModule,
        WelcomeRoutingModule,
        NzBreadCrumbModule
    ]
})
export class WelcomeModule {
}

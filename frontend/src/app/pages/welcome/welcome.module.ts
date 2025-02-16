import {NgModule} from '@angular/core';
import {WelcomeRoutingModule} from './welcome-routing.module';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {SharedModule} from '../../shared/shared.module';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from 'ng-zorro-antd/button';


@NgModule({
	declarations: [
		WelcomePageComponent
	],
    imports: [
        SharedModule,
        WelcomeRoutingModule,
        NzBreadCrumbModule,
        NzCardModule,
        NzDividerModule,
        NzIconModule,
        NzButtonModule
    ]
})
export class WelcomeModule {
}

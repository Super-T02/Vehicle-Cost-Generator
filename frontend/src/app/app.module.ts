import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { de_DE } from 'ng-zorro-antd/i18n';
import de from '@angular/common/locales/de';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {SharedModule} from './shared/shared.module';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {NzModalService} from 'ng-zorro-antd/modal';
registerLocaleData(de);

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		PageNotFoundComponent
	],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzDividerModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzToolTipModule,
    SharedModule,
    NzAlertModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('accessToken');
        }
      }
    })
  ],
	providers: [{ provide: NZ_I18N, useValue: de_DE }, {provide: ErrorHandler, useClass: AppComponent}, {provide: JwtHelperService}, {provide: NzModalService}, {provide: DatePipe}],
	bootstrap: [AppComponent]
})
export class AppModule {
}

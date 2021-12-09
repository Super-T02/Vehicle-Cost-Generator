import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostsRoutingModule } from './costs-routing.module';
import { CostsComponent } from './costs.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import { SingleCostsComponent } from './single-costs/single-costs.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import { RepeatingCostsComponent } from './repeating-costs/repeating-costs.component';
import { FuelCostsComponent } from './fuel-costs/fuel-costs.component';
import { CostsPerMonthChartComponent } from './costs-per-month-chart/costs-per-month-chart.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { CostOverviewComponent } from './cost-overview/cost-overview.component';
import {NzStatisticModule} from "ng-zorro-antd/statistic";


@NgModule({
  declarations: [
    CostsComponent,
    SingleCostsComponent,
    RepeatingCostsComponent,
    FuelCostsComponent,
    CostsPerMonthChartComponent,
    CostOverviewComponent
  ],
    imports: [
        CommonModule,
        CostsRoutingModule,
        NzBreadCrumbModule,
        NzTabsModule,
        NzButtonModule,
        NzIconModule,
        NzDividerModule,
        NzTableModule,
        NzToolTipModule,
        NzInputModule,
        NzPopconfirmModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
        NzStatisticModule,
    ]
})
export class CostsModule { }

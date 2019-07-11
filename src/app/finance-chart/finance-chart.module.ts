import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '~/shared/shared.module';
import { FinanceChartRoutingModule } from './finance-chart-routing.module';
import { FinanceChartComponent } from './finance-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    ChartsModule,
    FinanceChartRoutingModule
  ],
  declarations: [FinanceChartComponent]
})
export class FinanceChartModule { }

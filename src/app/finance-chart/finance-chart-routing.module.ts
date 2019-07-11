import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceChartComponent } from './finance-chart.component';

const routes: Routes = [
  {
    path: 'finance_chart',
    component: FinanceChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceChartRoutingModule { }

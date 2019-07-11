import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '~/shared/shared.module';
import { PlanRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    PlanRoutingModule
  ],
  declarations: [PlanComponent]
})
export class PlanModule { }

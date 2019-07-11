import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '~/shared/shared.module';
import { AutomationRoutingModule } from './automation-routing.module';
import { AutomationComponent } from './automation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    FormsModule,
    AutomationRoutingModule
  ],
  declarations: [AutomationComponent]
})
export class AutomationModule { }

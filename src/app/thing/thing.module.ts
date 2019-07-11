import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '~/shared/shared.module';
import { ThingRoutingModule } from './thing-routing.module';
import { ThingComponent } from './thing.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    SharedModule,
    ThingRoutingModule
  ],
  declarations: [ThingComponent]
})
export class ThingModule { }

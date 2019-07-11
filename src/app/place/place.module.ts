import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '~/shared/shared.module';
import { PlaceRoutingModule } from './place-routing.module';
import { PlaceComponent } from './place.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    PlaceRoutingModule
  ],
  declarations: [PlaceComponent]
})
export class PlaceModule { }

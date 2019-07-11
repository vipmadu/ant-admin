import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '~/shared/shared.module';
import { BeuserRoutingModule } from './beuser-routing.module';
import { BeuserComponent } from './beuser.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    SharedModule,
    BeuserRoutingModule
  ],
  declarations: [BeuserComponent]
})
export class BeuserModule { }

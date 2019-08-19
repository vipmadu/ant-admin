import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '~/shared/shared.module';
import { AutomationCreateRoutingModule } from './automation-create-routing.module';
import { AutomationCreateComponent } from './automation-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		NgZorroAntdModule,
		SharedModule,
		FormsModule,
		AutomationCreateRoutingModule
	],
	declarations: [AutomationCreateComponent]
})
export class AutomationCreateModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutomationCreateComponent } from './automation-create.component';

const routes: Routes = [
	{
		path: 'automation/create',
		component: AutomationCreateComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AutomationCreateRoutingModule { }

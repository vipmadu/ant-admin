import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutomationComponent } from './automation.component';

const routes: Routes = [
  {
    path: 'automation',
    component: AutomationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomationRoutingModule { }

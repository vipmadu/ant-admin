import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeuserComponent } from './beuser.component';

const routes: Routes = [
  {
    path: 'system/beuser',
    component: BeuserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeuserRoutingModule { }

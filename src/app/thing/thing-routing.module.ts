import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThingComponent } from './thing.component';

const routes: Routes = [
  {
    path: 'thing',
    component: ThingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThingRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleCreateComponent } from './article-create.component';

const routes: Routes = [
  {
    path: 'article_create',
    component: ArticleCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleCreateRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '~/shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    ArticleRoutingModule
  ],
  declarations: [ArticleComponent]
})
export class ArticleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '~/shared/shared.module';
import { ArticleCreateRoutingModule } from './article-create-routing.module';
import { ArticleCreateComponent } from './article-create.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    SharedModule,
    ArticleCreateRoutingModule
  ],
  declarations: [ArticleCreateComponent]
})
export class ArticleCreateModule { }

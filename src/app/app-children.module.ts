import { NgModule } from '@angular/core';

import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { ArticleListModule   } from './article/article-list/article-list.module';
import { ArticleCreateModule } from './article/article-create/article-create.module';

import { FinanceModule } from './finance/finance.module';
import { FinanceChartModule } from './finance-chart/finance-chart.module';
import { UserModule } from './user/user.module';
import { ThingModule } from './thing/thing.module';

import { HelpModule } from './system/help/help.module';
import { ErrorModule } from './system/error/error.module';
import { MenuModule } from './system/menu/menu.module';
import { ConfigModule } from './system/config/config.module';
import { BeuserModule } from './system/beuser/beuser.module';
import { PlaceModule } from './place/place.module';
import { AutomationModule } from './automation/automation.module';

@NgModule({
	imports: [
	    DashboardModule,
	    LoginModule,
	    HelpModule,
	    ArticleListModule,
	    ArticleCreateModule,
	    ErrorModule,
	    MenuModule,
	    ConfigModule,
	    BeuserModule,
	    ThingModule,
	    FinanceModule,
	    PlaceModule,
	    AutomationModule,
	    FinanceChartModule,
	    UserModule
	]
})
export class AppChildrenModule { }
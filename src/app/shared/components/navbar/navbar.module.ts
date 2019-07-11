import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NavbarComponent } from './navbar.component';

import { Component, enableProdMode } from  '@angular/core';
enableProdMode();

@NgModule({
	imports: [
	    CommonModule,
	    RouterModule,
	    NgZorroAntdModule
	],
	declarations: [NavbarComponent],
	exports: [NavbarComponent]
})
export class NavbarModule { }

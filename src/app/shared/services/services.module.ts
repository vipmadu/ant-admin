import { NgModule } from '@angular/core';

import { UserService } from './user.service';
export { UserService } from './user.service';

import { HttpService } from './http.service';
export { HttpService } from './http.service';

@NgModule({
  providers: [
  ]
})
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [UserService,HttpService]
    };
  }
}

import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';

import { UserService } from '~/shared/shared.module';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

    // 不登陆可以访问的页面
    publicPage = [
        '/login'
    ];

    constructor(
        private router: Router,
        private user: UserService,
        private notification: NzNotificationService
    ) {}

    // 路由守卫
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable < boolean > | Promise < boolean > | boolean 
    {
        if (this.publicPage.find(guest => state.url.startsWith(guest))) {
            return true;
        }

        return this.user.checkLogin().catch(() => {
            this.router.navigate(['/login', { next: state.url }]);
            return Promise.resolve(false);
        });
    }
}

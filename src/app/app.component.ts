import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';

import { UserService } from '~/shared/shared.module';

@Component({
    selector: 'app-root,[app-root]',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    host: {
        '[class.colorweak]': 'layout.setting.colorweak',
        '[attr.theme]': 'layout.setting.theme',
        '[attr.color]': 'layout.setting.color',
        '[attr.mode]': 'layout.setting.mode'
    }
})
export class AppComponent {

    layout = {
        collapsed: true,
        siderMode: 'side',
        topMode: function() {
            return this.siderMode != 'over' && this.setting.mode == 'top';
        },
        setting: {
            theme: 'light',
            color: 'daybreak',
            mode: 'side',
            fixedWidth: false,
            colorweak: false
        }
    };
    
    constructor(
        public breakpointObserver: BreakpointObserver,
        public router: Router,
        public user: UserService,
        private modal: NzModalService
    ) {
        breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
            this.layout.siderMode = result.matches ? 'over' : 'side';
            this.layout.collapsed = result.matches;
        });

        router.events.pipe(filter(event => event instanceof ActivationStart)).subscribe(() => {
            if (this.layout.siderMode == 'over') {
                this.layout.collapsed = true;
            }
        });
    }


    ngOnInit(): void {

        // 菜单
        this.user.menu = JSON.parse(localStorage.getItem('menu'));
        
    }

    logout() {
        this.modal.confirm({
            nzTitle: '确定要退出登录吗？',
            nzMaskClosable: true,
            nzOnOk: () => this.user.logout()
        });
    }

}

import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd';
import { HttpService } from '../../shared/shared.module';
import { Menu } from '../../model/menu';
import { NzMessageService,NzModalService,NzNotificationService } from 'ng-zorro-antd';
import { UserService } from '~/shared/shared.module';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

    constructor(
        private http: HttpService,
        private NzModal: NzModalService,
        private notification: NzNotificationService,
        private user: UserService,
        private message: NzMessageService
    ) {}

    ngOnInit() {
        this.initData();
    }

    isLoading = false;
    selectMenu = new Menu;

    // 初始化基础数据
    initData() {

        this.isLoading = true;

        //网络请求
        this.http.get( '/menu',{} )
            .then( (res:any ) => {
                if( res.code == 0 ){
                    //menuSite
                    this.menuSite = res.data.site;

                    // menuBack
                    this.menuBack = res.data.back;

                    // menuFooter
                    this.menuFooter = res.data.footer;
                }else{
                    this.message.error(res.msg);
                }
            }).catch((msg : string) => {
                this.message.error(msg);
            })
            .finally( () => {
                this.isLoading = false;
            })
    }


    isVisible = false;
    menuSite = [];
    menuFooter = [];
    parentMenu = [];


    // 提交表单
    doSubmit(){

        this.isLoading = true;

        let url = '/menu';
        console.log(this.selectMenu);
        if( this.selectMenu.id ){
            url = '/menu/update/'+this.selectMenu.id;
        }

        this.http.post(url, this.selectMenu )
            .then( (res:any ) => {
                if (res.code == 0) {
                    this.message.create('success',res.msg);
                    this.isVisible = false;

                    // 更新本地菜单
                    localStorage.setItem('menu',JSON.stringify(res.menu));
                    this.user.menu = res.menu;


                    this.initData();
                } else {
                    this.message.create('error',res.msg);
                }
            }).catch((res : any) => {
                this.message.create('error',res);
            })
            .finally( () => {
                this.isLoading = false;
            })
    }

    newMenu(){
        this.initParentMenu();
        this.isVisible = true;
    }

    showModal(): void {
        this.initParentMenu();
        this.isVisible = true;
    }

    handleOk(): void {
        this.doSubmit();
        
    }

    initParentMenu(){
        switch (this.selectMenu.app) {
            case "Admin":
                this.parentMenu = this.menuBack;
                break;
            case "Home":
                this.parentMenu = this.menuSite;
                break;
            case "Footer":
                this.parentMenu = this.menuFooter;
                break;
            default:
                this.parentMenu = this.menuSite;
                break;
        }

        // console.log(this.parentMenu);
    }

    handleCancel(): void {
        this.isVisible = false;
        this.selectMenu = new Menu;
        this.parentMenu = [];
    }

    menuBack = [];

    nzEvent(event: NzFormatEmitEvent): void {
        console.log(event);
    }

    menuClick(event: NzFormatEmitEvent): void {

        // console.log(event.node.origin);

        let item = event.node.origin;
        let menu = new Menu();
        menu.id = item.id;
        menu.parent_id = item.parent_id;
        menu.app = item.app;
        menu.title = item.title;
        menu.icon = item.icon;
        menu.alias = item.alias;
        menu.type = item.type;
        menu.model = item.model;
        menu.action = item.action;
        menu.param = item.param;
        menu.url = item.url;
        menu.target = item.target;
        menu.content = item.content;
        menu.remark = item.remark;
        menu.position = item.position;
        menu.image = item.image;
        menu.active = item.active;
        menu.html = item.html;
        menu.isLeaf = item.isLeaf;
        menu.hidden = item.hidden;
        this.selectMenu = menu;

        this.initParentMenu();

        this.showModal();
    }

    handleAppChange(){
        this.initParentMenu();
    }

    // 删除数据确认
    delItem() {
        this.NzModal.confirm({
            nzTitle: '确定要删除吗?',
            nzOkText: '确认',
            nzOkType: 'danger',
            nzOnOk: () => this.postDel(),
            nzCancelText: '取消'
        });
    }

    postDel(): void {
        this.isVisible = false;
        let id = this.selectMenu.id;

        this.deletedData(id);
    }

    deletedData(id : string) {
        
        this.isLoading = true;

        //网络请求
        this.http.post( '/menu/delete/'+id,{} )
            .then( (res:any ) => {
                this.notification.create('success',res.msg,'');
                this.selectMenu = new Menu;
                this.initData();
                
                // 更新本地菜单
                localStorage.setItem('menu',JSON.stringify(res.menu));
                this.user.menu = res.menu;

            }).catch((msg : string) => {
                this.notification.create('error',msg,'');
            })
            .finally( () => {
                this.isLoading = false;
            })
    }

}

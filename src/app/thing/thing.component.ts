import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/shared.module';
import { NzMessageService,NzModalService,NzNotificationService } from 'ng-zorro-antd';
import { Thing } from '../model/thing';


@Component({
	selector: 'app-thing',
	templateUrl: './thing.component.html',
	styleUrls: ['./thing.component.less']
})
export class ThingComponent implements OnInit {

	constructor(
        private http: HttpService,
        private message: NzMessageService,
        private notification: NzNotificationService,
        private NzModal: NzModalService,
    ) {
    }

	ngOnInit() {

		this.initData();

	}

    isVisible = false;
	things = [];
    page = 1;
    num = 10;
    total_page:number;
    isLoading = false;
    selectThing = new Thing;

	// 初始化基础数据
    initData() {
        this.isLoading = true;

        //网络请求
        this.http.get( '/thing',{ page:this.page,num:this.num } )
            .then( (res:any ) => {
                this.things = res.data;
                this.total_page = Number(res.total_page);

            }).catch((msg : string) => {
                this.message.error(msg);
            })
            .finally( () => {
                this.isLoading = false;
            })
    }

    
    // 提交表单
    doSubmit(){

        this.isLoading = true;

        let url = '/thing';
        console.log(this.selectThing);
        if( this.selectThing.id ){
            url = '/thing/update/'+this.selectThing.id;
        }

        this.http.post(url, this.selectThing )
            .then( (res:any ) => {
                if (res.code == 0) {
                    this.message.create('success',res.msg);
                    this.isVisible = false;
                    this.selectThing = new Thing;
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

    newThing(){
        this.selectThing = new Thing;
        this.isVisible = true;
    }

    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        this.doSubmit();
        
    }


    deletedData(id : string) {
        
        this.isLoading = true;

        //网络请求
        this.http.post( '/thing/delete/'+id,{} )
            .then( (res:any ) => {
                this.notification.create('success',res.msg,'');
                this.selectThing = new Thing;
                this.initData();
            }).catch((msg : string) => {
                this.notification.create('error',msg,'');
            })
            .finally( () => {
                this.isLoading = false;
            })
    }

    handleCancel(): void {
        this.isVisible = false;
        this.selectThing = new Thing;
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
        let id = this.selectThing.id;
        this.deletedData(id);
    }

    editThing(item:any): void {
        let thing = new Thing();
        thing.id = item.id;
        thing.title = item.title;
        thing.date = item.date;
        thing.content = item.content;

        this.selectThing = thing;
        this.showModal();
    }
}

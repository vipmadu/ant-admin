import { Component, OnInit } from '@angular/core';

import { HttpService } from '../shared/shared.module';
import { NzMessageService,NzModalService,NzNotificationService } from 'ng-zorro-antd';
import { Automation } from '../model/automation';
import { Rule } from '../model/rule';

@Component({
	selector: 'app-automation',
	templateUrl: './automation.component.html',
	styleUrls: ['./automation.component.less']
})
export class AutomationComponent implements OnInit {

	constructor(
        private http: HttpService,
        private message: NzMessageService,
        private notice: NzNotificationService,
        private nzmodel: NzModalService,
    ){}


	page:any;
	isLoading = false;
    automations = [];
    pageNum = 1;
    num = 10;
    total_page:number;
    isVisible = false;

	ngOnInit() {
		this.initData();
	}

	// 初始化基础数据
    initData() {
        this.isLoading = true;

        //网络请求
        this.http.get( '/automation',{ page:this.pageNum,num:this.num } )
            .then( (res:any ) => {
                if( res.code == 0 ){
                    this.automations = res.data;
                    this.total_page = Number(res.total_page);
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

    // 删除数据确认
    delListItem(id : string) {
        this.nzmodel.confirm({
            nzTitle: '确定要删除吗?',
            nzOkText: '确认',
            nzOkType: 'danger',
            nzOnOk: () => this.deletedData(id),
            nzCancelText: '取消'
        });
    }

    deletedData(id : string) {
        
        this.isLoading = true;

        //网络请求
        this.http.post( '/automation/delete/'+id,{} )
            .then( (res:any ) => {
            	if (res.code == 0) {
	            	this.initData();
	                this.notice.create('success',res.msg,'');
                } else {
                    this.message.create('error',res.msg);
                }
            }).catch((msg : string) => {
                this.notice.create('error',msg,'');
            })
            .finally( () => {
                this.isLoading = false;
            })
    }

    // 翻页
    nzPageIndexChange(number:number){
        this.pageNum = number;
        localStorage.setItem('automation_page',String(this.pageNum));

        // 因为页码改变会先执行本事件
        // 所以延迟10毫秒，如果页码改变就不执行数据获取
        let num = this.num;
        let that = this;
        setTimeout(function(){
            if( that.num == num ){
                that.initData();
            }
        },10);
    }

    // 每页条数
    nzPageSizeChange(number:number){
        this.num = number;
        this.initData();
    }
}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/shared.module';
import { NzMessageService,NzModalService,NzNotificationService } from 'ng-zorro-antd';
import { Finance } from '../model/finance';

@Component({
	selector: 'app-finance',
	templateUrl: './finance.component.html',
	styleUrls: ['./finance.component.less']
})
export class FinanceComponent implements OnInit {

	constructor(
        private http: HttpService,
        private message: NzMessageService,
        private notice: NzNotificationService,
        private NzModal: NzModalService,
    ) {
    }

    finances = [];
    page = 1;
    num = 10;
    total_page:number;
    isLoading = false;

    isVisible = false;
    selectFinance = new Finance;

    ngOnInit() {

        let page = Number(localStorage.getItem('finance_page'));
        if( page ){
            this.page = Number(page);
        }else{
            this.page = 1;
            localStorage.setItem('finance_page',String(1));
        }

        this.initData();
    }

    // 初始化基础数据
    initData() {
        this.isLoading = true;

        //网络请求
        this.http.get( '/finance',{ page:this.page,num:this.num } )
            .then( (res:any ) => {
                if( res.code == 0 ){
                    this.finances = res.data;
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

    deletedData(id : string) {
        
        this.isLoading = true;

        //网络请求
        this.http.post( '/finance/delete/'+id,{} )
            .then( (res:any ) => {
                this.notice.create('success',res.msg,'');
                this.initData();
            }).catch((msg : string) => {
                this.notice.create('error',msg,'');
            })
            .finally( () => {
                this.isLoading = false;
            })
    }

    // 删除数据确认
    delListItem(id : string) {
        this.NzModal.confirm({
            nzTitle: '确定要删除吗?',
            nzOkText: '确认',
            nzOkType: 'danger',
            nzOnOk: () => this.deletedData(id),
            nzCancelText: '取消'
        });
    }


    // 翻页
    nzPageIndexChange(number:number){
        this.page = number;
        localStorage.setItem('finance_page',String(this.page));

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


    //---------------- 编辑


    // 提交表单
    doSubmit(){

        this.isLoading = true;

        let url = '/finance';
        console.log(this.selectFinance);
        if( this.selectFinance.id ){
            url = '/finance/update/'+this.selectFinance.id;
        }

        this.http.post(url, this.selectFinance )
            .then( (res:any ) => {
                if (res.code == 0) {
                    this.message.create('success',res.msg);
                    this.isVisible = false;
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

    newFinance(){
        this.isVisible = true;
    }

    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        this.doSubmit();
        
    }

    handleCancel(): void {
        this.isVisible = false;
        this.selectFinance = new Finance;
    }


    editFinance(item: any): void {
        let finance = new Finance();
        finance.id= item.id;
        finance.title= item.title;
        finance.add_time= item.add_time;
        finance.income= item.income;
        finance.basicincome= item.basicincome;
        finance.expenses= item.expenses;
        finance.surplus= item.surplus;
        finance.customer= item.customer;
        finance.category= item.category;
        finance.remark= item.remark;
        finance.users= item.users;
        finance.exchange_time= item.exchange_time;
        this.selectFinance = finance;
        this.showModal();
    }

}

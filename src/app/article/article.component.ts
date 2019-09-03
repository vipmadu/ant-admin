import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/shared.module';
import { NzMessageService,NzModalService,NzNotificationService } from 'ng-zorro-antd';
import { Article } from '../model/article';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less'],
    providers: [HttpService]
})
export class ArticleComponent implements OnInit {

    constructor(
        private http: HttpService,
        private message: NzMessageService,
        private notification: NzNotificationService,
        private NzModal: NzModalService,
    ) {
    }

    articles = [];
    page = 1;
    num = 10;
    total_page:number;
    isLoading = false;
    categorys =[];
    searchData = new Article;

    ngOnInit() {
        let page = Number(localStorage.getItem('article_page'));
        if( page ){
            this.page = Number(page);
        }else{
            this.page = 1;
            localStorage.setItem('article_page',String(1));
        }
        this.initData();
    }

    // 初始化基础数据
    initData() {
        this.isLoading = true;

        this.initCheckbox();

        let data = { page:this.page,num:this.num,sort:this.sort,order:this.order};
        data = Object.assign(data,this.searchData);

        //网络请求
        this.http.get( '/article', data )
            .then( (res:any ) => {
                if( res.code == 0 ){
                    this.articles = res.data;
                    this.total_page = Number(res.total_page);

                    this.categorys = res.categorys;
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


    //高级搜索-------------------------------------------------------------------------
    searchDataChange(){
        this.page = 1;
    }

    initSearch(){
        this.searchData = new Article;
    }
    //高级搜索-------------------------------------------------------------------------

    //排序-------------------------------------------------------------------------
    sort:string;
    order:string;
    sortChange(sort: { key: string; value: string }): void {
        this.sort = sort.key;
        this.order = sort.value == 'descend'?'desc':'asc';
        this.initData();
    }
    //排序-------------------------------------------------------------------------


    
    
    //列表操作 -------------------------------------------------------------------------
    deletedData(id : string) {
        
        this.isLoading = true;

        //网络请求
        this.http.post( '/article/delete/'+id,{} )
            .then( (res:any ) => {
                this.notification.create('success',res.msg,'');
                this.initData();
            }).catch((msg : string) => {
                this.notification.create('error',msg,'');
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
        localStorage.setItem('article_page',String(this.page));

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
    //列表操作 -------------------------------------------------------------------------


    //批量操作-------------------------------------------------------------------------
    action:any;
    allChecked = false;
    indeterminate = false;

    initCheckbox(){
        this.allChecked = false;
        this.indeterminate = false;
    }
    
    handleItem(check:boolean,id:string){
        let checked_num = 0;
        for (var i = this.articles.length - 1; i >= 0; i--) {
            if( this.articles[i].id == id ){
                this.articles[i].checked = check;
            }
            if( this.articles[i].checked ){
                checked_num++;
            }
        }

        if( checked_num == this.articles.length ){
            this.allChecked = true;
            this.indeterminate = false;
        }else if( checked_num == 0 ){
            this.allChecked = false;
            this.indeterminate = false;
        }else{
            this.indeterminate = true;
            this.allChecked = false;
        }
    }

    handleAllItem(check:boolean){
        this.indeterminate = false;
        for (var i = this.articles.length - 1; i >= 0; i--) {
            this.articles[i].checked = check;
        }
    }       

    disposeOption = [
        {"value":"deleted_true","title":"删除"},
        {"value":"hidden_true","title":"显示"},
        {"value":"hidden_false","title":"隐藏"},
        {"value":"free_true","title":"设置免费"},
        {"value":"free_false","title":"取消免费"},
    ]
    disposeConfirm(){
        let optionTitle = '';
        for (var i = this.disposeOption.length - 1; i >= 0; i--) {
            if( this.disposeOption[i].value ==  this.action ){
                optionTitle = this.disposeOption[i].title;
            }
        }

        this.NzModal.confirm({
            nzTitle: '确定要['+optionTitle+']选中的数据吗?',
            nzOkText: '确认',
            nzOkType: 'danger',
            nzOnOk: () => this.dispose(),
            nzCancelText: '取消'
        });

    }

    dispose(){
        // ids
        var selectItem = [];
        for (var i = this.articles.length - 1; i >= 0; i--) {
            if( this.articles[i].checked ){
                selectItem.push(this.articles[i].id);
            }
        }
        if( selectItem.length < 1 ){
            return;
        }
        console.log(selectItem);

        this.isLoading = true;

        //网络请求
        this.http.post( '/article/dispose/',{ids:selectItem,action:this.action} )
            .then( (res:any ) => {
                this.notification.create('操作成功',res.msg,'');
                this.allChecked = false;
                this.initData();
            }).catch((msg : string) => {
                this.notification.create('error',msg,'');
            })
            .finally( () => {
                this.isLoading = false;
            })
    }
    //批量操作-------------------------------------------------------------------------
}

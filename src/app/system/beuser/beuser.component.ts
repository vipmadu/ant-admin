import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/shared.module';
import { NzMessageService,NzModalService,NzFormatEmitEvent } from 'ng-zorro-antd';
import { Beuser } from '../../model/beuser';
import { Begroup } from '../../model/begroup';


import {environment } from '../../../environments/environment';
import { UploadFile } from 'ng-zorro-antd';


@Component({
    selector: 'app-beuser',
    templateUrl: './beuser.component.html',
    styleUrls: ['./beuser.component.less'],
    providers: [HttpService]
})
export class BeuserComponent implements OnInit {

    constructor(
        private http: HttpService,
        private NzModal: NzModalService,
        private message: NzMessageService
    ) {
    }

    beusers = [];
    keyword:string;
    page = 1;
    num = 10;
    total_page:number;
    isLoading = false;
    isVisible = false;
    selectBeuser = new Beuser;

    addressables = [];



    // 文件上传
    file_upload_url = environment.api+'/common/upload';
    showUploadList = {
        showPreviewIcon: true,
        showRemoveIcon: true,
        hidePreviewIconInNonImage: true
    };
    fileList = [];
    previewImage: string | undefined = '';
    previewVisible = false;

    handlePreview = (file: UploadFile) => {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    };

    // 监听文件选择器
    handleChange(info:any): void {
        // console.log(info.type);
        if( info.file.response != undefined && info.file.response.data ){
            this.selectBeuser.image = info.file.response.data;
        }else if( info.type != undefined && info.type == "removed" ){
            this.selectBeuser.image = '';
        }else if( info.file.response != undefined && info.file.response.msg ){
            this.message.error(info.file.response.msg);
        }
    }


    ngOnInit() {

        this.setPage();

        this.initDataBegroup();

        this.initData();
        
    }

    nzCheck(event: NzFormatEmitEvent): void {
        console.log(event);
    }



    setPage(){
        let page = Number(localStorage.getItem('beuser_page'));
        if( page ){
            this.page = Number(page);
        }else{
            this.page = 1;
            localStorage.setItem('beuser_page',String(1));
        }
    }


    formatTree(data)
    {
        for (var i = 0; i < data.length; ++i) {
            if( typeof(data[i].children) == 'undefined' ){
                data[i].isLeaf = true;
            }else{
                for (var j = 0; j < data[i].children.length; ++j) {
                    if( typeof(data[i].children[j].children) == 'undefined' ){
                        data[i].children[j].isLeaf = true;
                    }
                }
            }
        }
    }

    newBeuser(){
        this.isVisible = true;
    }

    newBegroup(){
        this.isBegroupVisible = true;
    }

    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        this.doSubmit();
        
    }

    handleCancel(): void {
        this.isVisible = false;
        this.selectBeuser = new Beuser;
        this.fileList = [];
    }

    editBeuser(item: any): void {

        // console.log(item);

        // let item = event.node.origin;
        let beuser = new Beuser();
        beuser.id = item.id;
        beuser.newpassword = '';
        beuser.usergroup = item.usergroup;
        beuser.name = item.name;
        beuser.email = item.email;
        beuser.username = item.username;
        beuser.weibo_url = item.weibo_url;
        beuser.image = item.image;
        this.selectBeuser = beuser;

        if( item.image ){
            let imgitem =  {
                uid: 0,
                name: item.image,
                status: 'done',
                url: item.image_url
            };
            this.fileList = [imgitem];
        }

        this.showModal();
    }

    showBegroupModal(): void {
        this.isBegroupVisible = true;
    }

    // 提交表单
    doSubmit(){

        this.isLoading = true;

        let url = '/beuser';
        console.log(this.selectBeuser);
        if( this.selectBeuser.id ){
            url = '/beuser/update/'+this.selectBeuser.id;
        }

        this.http.post(url, this.selectBeuser )
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


    begroups = [];
    isBegroupVisible = false;
    selectBegroup = new Begroup;
    isBegroupLoading = false;

    editBegroup(item: any): void {

        console.log(item);

        // let item = event.node.origin;
        let begroup = new Begroup();
        begroup.id = item.id;
        begroup.title = item.title;
        begroup.remark = item.title;
        begroup.addressable = item.addressable;
        this.selectBegroup = begroup;

        this.showBegroupModal();
    }

    handleOkBegroup(): void {
        this.doSubmitBegroup();
        
    }

    handleCancelBegroup(): void {
        this.isBegroupVisible = false;
        this.selectBegroup = new Begroup;
    }
    // 提交表单
    doSubmitBegroup(){

        this.isBegroupLoading = true;

        let url = '/begroup';
        if( this.selectBegroup.id ){
            url = '/begroup/update/'+this.selectBegroup.id;
        }

        this.http.post(url, this.selectBegroup )
            .then( (res:any ) => {
                if (res.code == 0) {
                    this.message.create('success',res.msg);
                    this.isBegroupVisible = false;
                    this.initDataBegroup();
                } else {
                    this.message.create('error',res.msg);
                }
            }).catch((res : any) => {
                this.message.create('error',res);
            })
            .finally( () => {
                this.isBegroupLoading = false;
            })
    }

    // 初始化基础数据
    initData() {
        this.isLoading = true;

        //网络请求
        this.http.get( '/beuser',{ page:this.page,num:this.num,keyword:this.keyword } )
            .then( (res:any ) => {
                if( res.code == 0 ){
                    this.beusers = res.data;
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

    // 初始化基础数据 begroup
    initDataBegroup() {
        this.isBegroupLoading = true;

        //网络请求
        this.http.get( '/begroup',{ page:this.page,num:this.num } )
            .then( (res:any ) => {
                
                if( res.code == 0 ){
                    this.begroups = res.data;
                    this.addressables = res.addressables;
                }else{
                    this.message.error(res.msg);
                }

                // console.log(  );
            }).catch((msg : string) => {
                this.message.error(msg);
            })
            .finally( () => {
                this.isBegroupLoading = false;
            })
    }

    deletedData(id : string) {
        //网络请求
        this.isBegroupLoading = true;
        this.http.post( '/beuser/delete/'+id,{} )
            .then( (res:any ) => {
                this.message.success(res.msg);
                this.initData();
            }).catch((msg : string) => {
                this.message.error(msg);
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


    deletedBegroup(id : string) {
        //网络请求
        this.isBegroupLoading = true;
        this.http.post( '/begroup/delete/'+id,{} )
            .then( (res:any ) => {
                this.message.success(res.msg);
                this.initDataBegroup();
            }).catch((msg : string) => {
                this.message.error(msg);
            })
            .finally( () => {
                this.isBegroupLoading = false;
            })
    }

    // 删除数据确认
    delBegroupItem(id : string) {
        this.NzModal.confirm({
            nzTitle: '确定要删除吗?',
            nzOkText: '确认',
            nzOkType: 'danger',
            nzOnOk: () => this.deletedBegroup(id),
            nzCancelText: '取消'
        });
    }


    // 翻页
    nzPageIndexChange(number:number){
        this.page = number;
        localStorage.setItem('beuser_page',String(this.page));

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
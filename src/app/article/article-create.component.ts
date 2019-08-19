import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService,UploadFile } from 'ng-zorro-antd';
import { HttpService } from '../shared/shared.module';
import { Article } from '../model/article';
import {environment } from '../../environments/environment';

@Component({
	selector: 'app-article-create',
	templateUrl: './article-create.component.html',
	styleUrls: ['./article-create.component.less']
})
export class ArticleCreateComponent implements OnInit {

	constructor(
		private activeRoute: ActivatedRoute,
		private http: HttpService,
		private router: Router,
        private message: NzMessageService
	) { }


	id:string;
	isLoading = true;
	article = new Article;
	category = [];

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


	ngOnInit() {
        this.activeRoute.queryParams.subscribe(params => {
            if(params.id && params.id != '' ) {
                this.id = params.id;
            }
            this.initData();
        });
    }
    // 提交表单
    doSubmit(){

        this.isLoading = true;

        let url = '/article';
        if( this.id ){
            url = '/article/update/'+this.id;
        }

        this.http.post(url, this.article )
            .then( (res:any ) => {
                if (res.code == 0) {
                    this.message.create('success',res.msg);
                    this.router.navigate(['article']);
                } else {
                    this.message.create('error',res.msg);
                }
            }).catch((msg : string) => {
                this.message.create('error',msg);
            })
            .finally( () => {
                this.isLoading = false;
            })
    }


    // 初始化基础数据
    initData() {

    	this.isLoading = false;

    	let url = '/article/create';
        if( this.id ){
            url = '/article/edit/'+this.id;
        }

        //网络请求
        this.http.get( url,{} )
            .then( (res:any ) => {
                if( this.id ){
                    this.article = res.data.article;
                    if( this.article.image ){
                        let item =  {
                            uid: 0,
                            name: this.article.image,
                            status: 'done',
                            url: this.article.image_url
                        };
                        this.fileList = [item];
                    }
                }
                this.category = res.data.category;
            }).catch((msg : string) => {
                this.message.error(msg);
            })
            .finally( () => {
                this.isLoading = false;
            })
    }



    handlePreview = (file: UploadFile) => {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    };

    // 监听文件选择器
    handleChange(info:any): void {
        // console.log(info.type);
        if( info.file.response != undefined && info.file.response.data ){
            this.article.image = info.file.response.data;
        }else if( info.type != undefined && info.type == "removed" ){
            this.article.image = '';
        }else if( info.file.response != undefined && info.file.response.msg ){
            this.message.error(info.file.response.msg);
        }
    }

}

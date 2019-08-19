import { Component, OnInit } from '@angular/core';
import G6 from '@antv/g6';
import G6Editor from '@antv/g6-editor'
import { HttpService } from '../shared/shared.module';
import { NzMessageService,NzModalService,NzNotificationService } from 'ng-zorro-antd';
import { Automation } from '../model/automation';
import { Rule } from '../model/rule';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-automation-create',
	templateUrl: './automation-create.component.html',
	styleUrls: ['./automation-create.component.less']
})
export class AutomationCreateComponent implements OnInit {

	constructor(
        private http: HttpService,
        private message: NzMessageService,
        private notice: NzNotificationService,
        private nzmodel: NzModalService,
        private activeRoute: ActivatedRoute,
    ){}

	id:any;
	page:any;
	editor:any;
	hideLableEdit = true;
	selectItem = new Rule;
	isLoading = false;
	selectAutomation = new Automation;

	actionsOrtriggers = [];

	triggers = [
		{
			'vlaue':'follow',
			'title':'关注'
		},
		{
			'vlaue':'unfollow',
			'title':'取消关注'
		},
		{
			'vlaue':'get_wechat',
			'title':'收到微信消息'
		},
	];

	actions = [
		{
			'vlaue':'send_wechat',
			'title':'发送微信消息'
		},
		{
			'vlaue':'send_mail',
			'title':'发送邮件'
		},
	];


    // newAutomation(){
    // 	this.initEditorData(null);
    // }

    // editAutomation(item: any){
    // 	this.initEditorData(item.id);
    // }



	ngOnInit() {

		this.activeRoute.queryParams.subscribe(params => {
            if(params.id && params.id != '' ) {
                this.id = params.id;

                this.initEditorData(this.id);
            }else{
            	this.initEditorData(null);
            }

            this.initData();

            this.initEditor();
        });



		
	}

	// 初始化基础数据
    initData() {
        this.isLoading = true;

        //网络请求
 
    }




    // closeAutomation(){
    // 	this.selectAutomation = new Automation;
    // 	this.initEditorData(null);
    // }
	
	

	eventTypeChange(){
		this.initSelectItem();
	}

	initSelectItem(){

		let rule = this.selectItem;
		if( rule.event_type == 'trigger' ){
			this.actionsOrtriggers = this.triggers;
		}else if( rule.event_type == 'action' ){
			this.actionsOrtriggers = this.actions;
		}else{
			this.actionsOrtriggers = [];
		}
	}

	initEditor(){

		// 生成 G6 Editor 编辑器
		const editor = new G6Editor();

		// 元素面板栏
		const itempannel = new G6Editor.Itempannel({
		  container: 'itempannel',
		})

		// 详细面板
		const detailpannel = new G6Editor.Detailpannel ({
		  container: 'detailpannel'
		})

		// 主画布
		const page = new G6Editor.Flow({
			graph: {
				container: 'page'
			}
		})

		

		// 事件绑定
		page.on('afteritemselected', ev => {

			this.hideLableEdit = false;

			let data = ev.item.getModel();
			let rule = new Rule;
			rule.label = data.label;
			rule.event_type = data.event_type;
			rule.event_action = data.event_action;
			rule.event_data = data.event_data;
			this.selectItem = rule;

			this.initSelectItem();
		});

		page.on('afteritemunselected', ev => {
			this.hideLableEdit = true;
			this.selectItem = new Rule;
		});

		page.on('afterzoom', ev => {
			console.log(ev);
		});

		// 添加到编辑器
		editor.add(itempannel);
		editor.add(detailpannel);
		editor.add(page);

		// 全局赋值
		this.page = page;
		this.editor = editor;


		
	}

	initEditorData(id){

		console.log(id);
		if( id == null ){
			this.page.read( {edges: [],nodes:[] } );
			return;
		}

		//原始数据
		this.isLoading = true;

		this.selectAutomation.id = id;

        //网络请求
        this.http.get( '/automation/'+id,{  } )
            .then( (res:any ) => {
            	console.log( res.data );
				this.page.read( res.data );
            }).catch((msg : string) => {
                this.message.error(msg);
            })
            .finally( () => {
                this.isLoading = false;
            })
	}

	doSave(){
		let page = this.editor.getCurrentPage();
		let data = page.save();
		console.log( data );

		this.selectAutomation.edges = data.edges;
		this.selectAutomation.nodes = data.nodes;
		
		this.isLoading = true;

        let url = '/automation';
        if( this.selectAutomation.id ){
            url = '/automation/update/'+this.selectAutomation.id;
        }

        this.http.post(url, this.selectAutomation )
            .then( (res:any ) => {
                if (res.code == 0) {
                    
                    this.closeAutomation();
                    this.initData();

                    this.message.create('success',res.msg);
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

	labelChange(value){
		let page = this.editor.getCurrentPage();
		let selectedItems = page.getSelected();
		selectedItems.forEach(item => {
			page.update(item.id, {
				label: value
			})
		})
	}
}

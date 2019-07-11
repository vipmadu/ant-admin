import { Component, OnInit } from '@angular/core';
import G6 from '@antv/g6';
import G6Editor from '@antv/g6-editor'
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
        private notification: NzNotificationService,
        private NzModal: NzModalService,
    ){}

	editor:any;
	page:any;
	hideLableEdit = true;
	selectItem = new Rule;
	isLoading = false;
	selectAutomation = new Automation;


    automations = [];
    pageNum = 1;
    num = 10;
    total_page:number;
    isVisible = false;



	doSave(){
		const page = this.editor.getCurrentPage();
		const data = page.save();
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
                    this.message.create('success',res.msg);
                    this.selectAutomation = new Automation;
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
		const page = this.editor.getCurrentPage();
		const selectedItems = page.getSelected();
		selectedItems.forEach(item => {
			page.update(item.id, {
				label: value
			})
		})
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


    editAutomation(){
    	this.isVisible = true;
    }

    claseAutomation(){
    	this.isVisible = false;
    }
	
	ngOnInit() {

		this.initData();

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
			this.selectItem = rule
			console.log(this.selectItem);
			console.log(this.selectItem.label);
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


		//原始数据
		this.isLoading = true;

        //网络请求
        this.http.get( '/automation/8',{  } )
            .then( (res:any ) => {
				page.read( res.data );
            }).catch((msg : string) => {
                this.message.error(msg);
            })
            .finally( () => {
                this.isLoading = false;
            })
	}

}

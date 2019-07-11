import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/shared.module';
import { NzMessageService,NzModalService,NzNotificationService } from 'ng-zorro-antd';

@Component({
	selector: 'app-finance-chart',
	templateUrl: './finance-chart.component.html',
	styleUrls: ['./finance-chart.component.less']
})
export class FinanceChartComponent implements OnInit {


	constructor(
        private http: HttpService,
        private message: NzMessageService,
        private notice: NzNotificationService,
	) { }

	isLoading = false;


	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;
	public barChartOptions:any = {
		scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },

		scaleShowVerticalLines: false,

		// 响应式
		responsive: true,
		 // Y 轴的起始值  
    	scaleStartValue:0,
    	scaleStepWidth : 2000,
	};

	// 数据
	public barChartLabels2019:string[] = [];
	public barChartData2019:any[] = [
		// {data: [], label: '固定工资'},
		{data: [], label: '收入'},
		// {data: [], label: '扣除'},
	];

	public barChartLabels2018:string[] = [];
	public barChartData2018:any[] = [
		// {data: [], label: '固定工资'},
		{data: [], label: '收入'},
		// {data: [], label: '扣除'},
	];
	public barChartLabels2017:string[] = [];
	public barChartData2017:any[] = [
		// {data: [], label: '固定工资'},
		{data: [], label: '收入'},
		// {data: [], label: '扣除'},
	];
	public barChartLabels2016:string[] = [];
	public barChartData2016:any[] = [
		// {data: [], label: '固定工资'},
		{data: [], label: '收入'},
		// {data: [], label: '扣除'},
	];
	public barChartLabels2015:string[] = [];
	public barChartData2015:any[] = [
		// {data: [], label: '固定工资'},
		{data: [], label: '收入'},
		// {data: [], label: '扣除'},
	];

	public barChartLabels2014:string[] = [];
	public barChartData2014:any[] = [
		// {data: [], label: '固定工资'},
		{data: [], label: '收入'},
		// {data: [], label: '扣除'},
	];

	ngOnInit() {
		this.getChartData(2019);
		this.getChartData(2018);
		this.getChartData(2017);
		this.getChartData(2016);
		this.getChartData(2015);
		this.getChartData(2014);

	}

	setChartData(year,res){
		switch (year) {
			case 2019:
				this.barChartLabels2019 = res.data.lable;
				// this.barChartData2019[0].data = res.data.basicincome;
				this.barChartData2019[0].data = res.data.income;
				// this.barChartData2019[2].data = res.data.expenses;
				break;
			case 2018:
				this.barChartLabels2018 = res.data.lable;
				// this.barChartData2018[0].data = res.data.basicincome;
				this.barChartData2018[0].data = res.data.income;
				// this.barChartData2018[2].data = res.data.expenses;
				break;
			case 2017:
				this.barChartLabels2017 = res.data.lable;
				// this.barChartData2017[0].data = res.data.basicincome;
				this.barChartData2017[0].data = res.data.income;
				// this.barChartData2017[2].data = res.data.expenses;
				break;
			case 2016:
				this.barChartLabels2016 = res.data.lable;
				// this.barChartData2016[0].data = res.data.basicincome;
				this.barChartData2016[0].data = res.data.income;
				// this.barChartData2016[2].data = res.data.expenses;
				break;
			case 2015:
				this.barChartLabels2015 = res.data.lable;
				// this.barChartData2015[0].data = res.data.basicincome;
				this.barChartData2015[0].data = res.data.income;
				// this.barChartData2015[2].data = res.data.expenses;
				break;
			case 2014:
				this.barChartLabels2014 = res.data.lable;
				// this.barChartData2014[0].data = res.data.basicincome;
				this.barChartData2014[0].data = res.data.income;
				// this.barChartData2015[2].data = res.data.expenses;
				break;
			default:
				// code...
				break;
		}
	}

	getChartData(year:number){
		this.isLoading = true;

        //网络请求
        this.http.get( '/finance/year',{ year:year } )
            .then( (res:any ) => {
                if( res.code == 0 ){
  					this.setChartData(year,res);
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

	// events
	public chartClicked(e:any):void {
		console.log(e);
	}

	public chartHovered(e:any):void {
		console.log(e);
	}
}

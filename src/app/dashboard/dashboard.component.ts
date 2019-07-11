import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/shared.module';
import { NzMessageService,NzModalService,NzNotificationService } from 'ng-zorro-antd';
import * as L7 from '@antv/l7';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {


	isLoading = false;

	constructor(
		private http: HttpService,
        private message: NzMessageService,
        private notice: NzNotificationService,
        private NzModal: NzModalService,
	) { }


	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true
	};

	// bar
	public barChartLabels:string[] = [];
	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;
	public barChartData:any[] = [
		{data: [], label: '实际收入'},
		{data: [], label: '固定收入'}
	];


	// line
	public lineChartLabels:string[] = ['1','2','3'];
	public lineChartType:string = 'line';
	public lineChartLegend:boolean = true;
	public lineChartData:any[] = [
		{data: [1,4,2], label: '实际收入'},
		{data: [1,3,4], label: '固定收入'}
	];


	// line
	public bar2ChartLabels:string[] = ['1','2','3'];
	public bar2ChartType:string = 'bar';
	public bar2ChartLegend:boolean = true;
	public bar2ChartData:any[] = [
		{data: [1,4,2], label: '实际收入'},
		{data: [1,3,4], label: '固定收入'}
	];

	// PolarArea
	public polarAreaChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
	public polarAreaChartData:number[] = [300, 500, 100, 40, 120];
	public polarAreaLegend:boolean = true;
	public polarAreaChartType:string = 'polarArea';

	
	// Pie
	public pieChartType:string = 'pie';
	public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
	public pieChartData:number[] = [300, 500, 100];

	ngOnInit() {
		this.initChart();
	}

	initChart(){

		this.isLoading = true;

        //网络请求
        this.http.get( '/finance/all',{} )
            .then( (res:any ) => {
                if( res.code == 0 ){
                    this.barChartData[0].data = res.data.income;
                    this.barChartData[1].data = res.data.basicincome;
                    this.barChartLabels = res.data.lable;
                    // console.log( this.barChartData );
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
}

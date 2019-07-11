import {Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import {Router } from '@angular/router';
import {environment } from '../../../environments/environment';
import { NzNotificationService } from 'ng-zorro-antd';
// import { UserService } from '../../shared/shared.module';

@Injectable({
    providedIn: 'root',
})

export class HttpService {

    constructor(
        private http: HttpClient,
        private router: Router,
        // public user: UserService,
        private nzNotify: NzNotificationService
    ){}

    /**
     * 构建包含域名的完整URL
     * 
     * @param path API的路径
     */
    public url(path:string) : string {
        return environment.api + path;
    }


    /**
     * 头部信息
     * 
     */
    public httpOptions(){
        
        /**
           * 如果有token的话，添加请求头的token
        */
        let token = '';
        let user = localStorage.getItem('user');
        if ( user ) {
            token = JSON.parse(user).token;
        }

        // 组合头部信息
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': token
            })
        };

        return httpOptions;
    }

    /**
    * get请求
    * @param url 接口地址
    * @param params 参数
    * @returns {Promise<R>|Promise<U>}
    */
   public get(path: string, params: any) {

        let dataParams = new HttpParams();
        for (const key in params) {
            if (params[key] === false || params[key]) {
                dataParams = dataParams.set(key, params[key]);
            }
        }
        /**
         * 如果为生产环境时，不需要porxy代理，
         * 为了统一处理请求的url，获取在environment中配置的请求地址及变量，
         * 进行生产环境的请求地址拼接
         */
        let reqUrl = this.url(path);
        // console.log(reqUrl);

        let httpOptions = this.httpOptions();

        let res = this.http.get(reqUrl, {headers: httpOptions.headers, params: dataParams }).toPromise();

        // Token 验证
        res.then( (data:any ) => {
            if(data.code == 20001 || data.code == 20002 || data.code == 20003){
                localStorage.removeItem('user');
                localStorage.removeItem('menu');
                return this.router.navigateByUrl('/login');
            }
        })
        
        return res;
    }


    /**
    * post请求
    * @param url 接口地址
    * @param params 参数
    * @returns {Promise<R>|Promise<U>}
    */
    public post(path: string, params: any) {
 
        let reqUrl = this.url(path);
        // console.log(reqUrl);

        let httpOptions = this.httpOptions();

        let res = this.http.post(reqUrl, params, httpOptions).toPromise();

        // Token 验证
        res.then( (data:any ) => {
            if(data.code == 20001 || data.code == 20002 || data.code == 20003){
                localStorage.removeItem('user');
                localStorage.removeItem('menu');
                return this.router.navigateByUrl('/login');
            }
        })

        return res;
    }

    /**
    * 处理请求错误
    * @param error
    * @returns {void|Promise<string>|Promise<T>|any}
    */
    private handleError(error) {

        console.log('---- 请求错误 开始 ----');
        console.log(error);
        console.log('---- 请求错误 结束 ----');

        if (error.status != 200) {
            this.nzNotify.info('提示','网络请求错误');
            return;
        }
    }
}
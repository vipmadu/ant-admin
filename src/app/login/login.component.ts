import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { UserService } from '~/shared/shared.module';
import { HttpService } from '../shared/shared.module';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    constructor(
        private router: Router,
        private http: HttpService,
        private fb: FormBuilder,
        private message: NzMessageService,
        private user: UserService
    ) {}


    validateForm: FormGroup;
    submiting = false;

    username:string;
    password:string;

    region = {
        sider: false,
        header: false,
        footer: false
    };

    
    ngOnInit(): void {

        // 表单验证
        this.validateForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true]
        });

    }

    submitForm() {

        // 表单验证
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        if (!this.validateForm.valid) {
            return false;
        }

        this.submiting = true;

        //网络请求
        this.http.post( '/beuser/login',{ username:this.username,password:this.password } )
            .then( (res:any ) => {
                if( res.code == 0 ){
                    this.user.loginUser = res.data;
                    this.user.menu = res.menu;

                    localStorage.setItem('user',JSON.stringify(res.data));
                    localStorage.setItem('menu',JSON.stringify(res.menu));

                    this.router.navigateByUrl('/');
                    // this.message.success(res.msg);
                } else {
                    this.message.create('error',res.msg);
                }
            }).catch((msg : string) => {
                this.message.error(msg);
            })
            .finally( () => {
                this.submiting = false;
            })
    }
}
import {Component, ErrorHandler, OnInit} from '@angular/core';
import {ResizeService} from './core/services/resize.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthService} from './core/services/auth.service';
import {ApiError} from './models/api.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements ErrorHandler, OnInit{

  handleError(error: any): void {
    if(error.code === 403) {
      this.auth.handleAuthError(error as ApiError);
    }
    else {
      console.log(error);
      this.message.create('error', error.message, {nzDuration: 10000});
    }
  }

	constructor(public resizeService: ResizeService,
              private message: NzMessageService,
              private auth: AuthService) {
	}

  ngOnInit(): void {
    this.auth.isAuthenticated().subscribe();
  }

}

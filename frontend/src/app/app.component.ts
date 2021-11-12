import {Component, ErrorHandler} from '@angular/core';
import {ResizeService} from './core/services/resize.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements ErrorHandler{

  handleError(error: any): void {
    console.log(error);
    this.message.create('error', error.message, {nzDuration: 10000});
  }

	constructor(public resizeService: ResizeService,
              private message: NzMessageService) {
	}
}

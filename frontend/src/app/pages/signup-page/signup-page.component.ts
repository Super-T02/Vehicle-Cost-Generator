import { Component, OnInit } from '@angular/core';
import {ResizeService} from '../../core/services/resize.service';
import {MEDIA_BREAKPOINTS} from '../../../environments/constants';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.less', '../../shared/styles/two-columns-two-flex.less']
})
export class SignupPageComponent implements OnInit {
  breakPoints = MEDIA_BREAKPOINTS;
  currentStep: number;
  countdown: number;

  constructor(
    public resize: ResizeService,
    private message: NzMessageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.currentStep = 0;
    this.countdown = 0;
  }

  submitted(success: boolean) {
    if (success) {
      this.currentStep = 1;
      this.countdown = 5;

      this.message.success('Successfully signed up!', {nzDuration: 3000});

      // Interval for the timer
      setInterval(() => {
        this.countdown > 0 ? this.countdown -- : undefined;
      },1000);

      // Auto redirect
      setTimeout(() => {
        this.router.navigate(['overview/']).then();
      },this.countdown * 1000);
    }
  }
}

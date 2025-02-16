import { Component } from '@angular/core';
import {MEDIA_BREAKPOINTS} from '../../../environments/constants';
import {ResizeService} from '../../core/services/resize.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less', '../../shared/styles/two-columns-two-flex.less']
})
export class LoginPageComponent {

  breakPoints = MEDIA_BREAKPOINTS;

  constructor(public resize: ResizeService) { }

}

import { Component, OnInit } from '@angular/core';
import {MEDIA_BREAKPOINTS} from '../../../environments/constants';
import {ResizeService} from '../../core/services/resize.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {

  breakPoints = MEDIA_BREAKPOINTS;

  constructor(public resize: ResizeService) { }

  ngOnInit(): void {
  }

}

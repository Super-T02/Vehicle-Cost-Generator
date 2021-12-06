import { Component, OnInit } from '@angular/core';
import {ResizeService} from '../../core/services/resize.service';
import {MEDIA_BREAKPOINTS} from '../../../environments/constants';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.less', '../../shared/styles/two-columns-two-flex.less']
})
export class SignupPageComponent implements OnInit {
  breakPoints = MEDIA_BREAKPOINTS;

  constructor(public resize: ResizeService) { }

  ngOnInit(): void {
  }

}

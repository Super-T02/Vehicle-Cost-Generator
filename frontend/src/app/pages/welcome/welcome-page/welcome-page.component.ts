import {Component, OnInit} from '@angular/core';
import {ResizeService} from '../../../core/services/resize.service';
import {MEDIA_BREAKPOINTS} from '../../../../environments/constants';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.less']
})
export class WelcomePageComponent implements OnInit {

  breakPoints = MEDIA_BREAKPOINTS;

  constructor(public resizeService: ResizeService) {
  }

  ngOnInit(): void {
  }
}

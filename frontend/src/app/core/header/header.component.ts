import {Component, OnInit} from '@angular/core';
import {ResizeService} from '../services/resize.service';
import {MEDIA_BREAKPOINTS} from '../../../environments/constants';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  breakPoints = MEDIA_BREAKPOINTS;

  constructor(public resizeService: ResizeService) {
  }

  ngOnInit(): void {
  }
}

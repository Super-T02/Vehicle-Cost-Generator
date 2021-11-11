import {Component} from '@angular/core';
import {ResizeService} from '../services/resize.service';
import {MEDIA_BREAKPOINTS} from '../../../environments/constants';
import {AuthService} from '../services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less']
})
export class HeaderComponent  {

  breakPoints = MEDIA_BREAKPOINTS;

  constructor(public resizeService: ResizeService,
              public auth: AuthService) {
  }

}

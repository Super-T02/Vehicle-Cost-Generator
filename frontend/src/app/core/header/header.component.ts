import {Component, OnInit} from '@angular/core';
import {ResizeService} from '../services/resize.service';
import {MEDIA_BREAKPOINTS} from '../../../environments/constants';
import {AuthService} from '../services/auth.service';
import {Event, RouterEvent, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  breakPoints = MEDIA_BREAKPOINTS;
  url: string = '';

  constructor(
    public resizeService: ResizeService,
    public auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      this.url = e.url;
    });
  }

}

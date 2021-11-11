import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {LastRouteService} from '../services/last-route.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService,
              private router:Router,
              private message: NzMessageService,
              private lastRoute: LastRouteService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      // Get the actual URL
      this.lastRoute.newUrl(route.url);

      this.router.navigate(['/login']).then();
      this.message.error('Please login first', {nzDuration: 7000});

      return false;
    } else {
      return true;
    }
  }
}

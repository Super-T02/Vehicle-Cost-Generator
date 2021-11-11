import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService,
              private router:Router,
              private message: NzMessageService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']).then();
      this.message.error('Please login first', {nzDuration: 7000});
      return false;
    } else {
      return true;
    }
  }
}

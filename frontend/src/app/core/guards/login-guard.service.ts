import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {LastRouteService} from '../services/last-route.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private lastUrl: LastRouteService,
  )  { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const can = !this.auth.authenticated;

    if(!can) this.router.navigate([this.lastUrl.route], {queryParams: this.lastUrl.query}).then();

    return can;
  }
}

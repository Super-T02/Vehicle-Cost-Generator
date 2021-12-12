import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {LastRouteService} from '../services/last-route.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService,
              private router:Router,
              private message: NzMessageService,
              private lastRoute: LastRouteService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.auth.isAuthenticated()
        .subscribe((isAuthenticated) => {
            if (!isAuthenticated) {
              // Get the actual URL
              this.lastRoute.newUrl(route.url);

              this.router.navigate(['/login']).then();
              this.message.error('Please login first', {nzDuration: 7000});

              observer.next(false);
            } else {
              observer.next(true);
            }
          },
          error => this.auth.handleAuthError(error)
        );
    });


  }
}

import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ApiService} from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class VinGuardService implements CanActivate {

  constructor(private auth: AuthService,
              private message: NzMessageService,
              private router:Router,
              private api :ApiService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let vin = route.params.vin;
      vin ? vin = vin.toUpperCase() : observer.next(false);
      this.api.getVehicle(this.auth.username, vin).subscribe(() => observer.next(true),
        error => {
          if(error.code === 403) {
            this.auth.handleAuthError(error);
          } else {
            this.router.navigate(['/overview']).then();
            this.message.error(error.message, {nzDuration: 3000});
            observer.next(false);
          }
        },
      );

    });
  }
}

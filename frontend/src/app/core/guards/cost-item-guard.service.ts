import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostItemGuardService implements CanActivate{

  constructor(
    private auth: AuthService,
    private message: NzMessageService,
    private router:Router,
    private api :ApiService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let vin = route.params.vin;
      let id = route.params.id;
      console.log(vin, id);
      !id ? observer.next(false) : undefined;
      const loaded = {single: false, repeating: false, fuel: false};
      // Check whether the id exists
      this.api.getSingleCost(this.auth.username, vin, id).subscribe(
        () => observer.next(true),
        () => {
          loaded.single = true;

          if (loaded.single && loaded.fuel && loaded.repeating) {
            this.message.error('The given route doesn\'t exists', {nzDuration: 3000});
            this.router.navigate(['/404']).then(() => observer.next(false));
          }
        }
      );
      this.api.getRepeatingCost(this.auth.username, vin, id).subscribe(
        () => observer.next(true),
        () => {
          loaded.repeating = true;

          if (loaded.single && loaded.fuel && loaded.repeating) {
            this.router.navigate(['/404']).then(() => observer.next(false));
          }
        }
      );
      this.api.getFuelCost(this.auth.username, vin, id).subscribe(
        () => observer.next(true),
        () => {
          loaded.fuel = true;

          if (loaded.single && loaded.fuel && loaded.repeating) {
            this.router.navigate(['/404']).then(() => observer.next(false));
          }
        }
      );

    });
  }
}

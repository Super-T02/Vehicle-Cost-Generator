import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ApiService} from './api.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService,
              private api: ApiService,
              private message: NzMessageService) { }

  /**
   * Check whether the access token is expired or not
   */
  isAuthenticated(): Observable<boolean> {
    return new Observable((observer) => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        observer.next(false);
      } else if (this.jwtHelper.isTokenExpired(accessToken)) {
        this.api.getNewToken(refreshToken)
          .subscribe((output) => {
              if (output.data.accessToken) {
                localStorage.setItem('accessToken', output.data.accessToken);
                observer.next(true);
              } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                this.message.error('Something went wrong! Please login again.', {nzDuration: 10000});
                observer.next(false);
              }
            },
            (err) => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              this.message.error('Something went wrong! Please login again.', {nzDuration: 10000});
              observer.next(false);
            });
      } else {
        observer.next(true);
      }
    });


  }

}

import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {ApiError, ApiOutput} from '../../models/api.model';
import {Router} from '@angular/router';
import {LastRouteService} from './last-route.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;
  username: string = 'user';

  constructor(public jwtHelper: JwtHelperService,
              private api: ApiService,
              private router: Router,
              private lastRoute: LastRouteService,
              private message: NzMessageService,
              private util: UtilService
  ) {
    this.actualizeName();
  }

  /**
   * Gets the actual username from the JWT token and save it into this.username as string
   */
  actualizeName(): void {
    if(localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const decoded = this.jwtHelper.decodeToken(accessToken);

      decoded.username? this.username = decoded.username: this.username = 'user';
    } else {
      this.username = 'user';
    }
  }

  /**
   * Check whether the access token is expired or not
   * If the token is expired a new one would be requested from the api
   */
  isAuthenticated(): Observable<boolean> {
    return new Observable((observer) => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        this.authenticated = false;
        observer.next(false);
      } else if (this.jwtHelper.isTokenExpired(accessToken)) {
        // Get a new access token
        this.api.getNewToken(refreshToken)
          .subscribe((output: ApiOutput) => {
              if (output.data.accessToken) {
                const {accessToken} = output.data;

                localStorage.setItem('accessToken', accessToken);
                this.actualizeName();
                this.authenticated = true;
                observer.next(true);
              } else {
                this.authenticated = true;
                this.logout(false, 'You mus login again');
                observer.next(false);
              }
            },
            (err: ApiError) => {
              console.log(err);
              if (err.code === 403) {
                this.authenticated = true;
                this.logout(false, 'You mus login again');
                observer.next(false);
              }
            });
      } else {
        this.authenticated = true;
        observer.next(true);
      }
    });
  }

  /**
   * Handles a auth error (code 403)
   * @param error
   */
  handleAuthError(error: ApiError) {
    if (error.code !== 403) throw(error);

    this.isAuthenticated().subscribe(value => {
      if (!value) {
        this.logout(false, 'You mus login again');
        this.lastRoute.newUrlString(this.router.url);
        this.router.navigate(['login']).then();
        error.message = 'Please login first';
        throw(error);
      } else {
        error.message = 'Please try again';
        throw(error);
      }
    });
  }

  /**
   * Logs the user out
   */
  logout(success: boolean = true, message: string = 'You are successfully logged out'): void {
    if (this.authenticated) {
      this.api.logout(this.util.getRefreshToken()).subscribe();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.authenticated = false;
      success ? this.message.success(message, {
        nzDuration: 5000
      }) : this.message.error(message, {
        nzDuration: 5000
      });
    }
  }
}

import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {ApiOutput} from '../../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;
  username: string = 'user';

  constructor(public jwtHelper: JwtHelperService,
              private api: ApiService) { }

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
   */
  isAuthenticated(): Observable<boolean> {
    return new Observable((observer) => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        this.authenticated = false;
        observer.next(false);
      } else if (this.jwtHelper.isTokenExpired(accessToken)) {
        this.api.getNewToken(refreshToken)
          .subscribe((output: ApiOutput) => {
              if (output.data.accessToken) {
                const {accessToken} = output.data;

                localStorage.setItem('accessToken', accessToken);
                this.actualizeName();
                this.authenticated = true;
                observer.next(true);
              } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                this.authenticated = false;
                observer.next(false);
              }
            },
            () => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              this.authenticated = false;
              observer.next(false);
            });
      } else {
        this.authenticated = true;
        observer.next(true);
      }
    });


  }

}

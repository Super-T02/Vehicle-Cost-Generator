import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  /**
   * Check whether the access token is expired or not
   */
  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) return false;

    return !this.jwtHelper.isTokenExpired(accessToken);
  }
}

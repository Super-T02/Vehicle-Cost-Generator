import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  /**
   * Load the actual access token from the local storage
   */
  getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }

  /**
   * Load the actual refresh token from the local storage
   */
  getRefreshToken(): string {
    return  localStorage.getItem('refreshToken');
  }
}

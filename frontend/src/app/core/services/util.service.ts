import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  lastCostSelected: number = 0;

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

  /**
   * Set the access token
   * @param input
   */
  setAccessToken(input: string): void {
    localStorage.setItem('accessToken', input);
  }

  /**
   * Set the refresh token
   * @param input
   */
  setRefreshToken(input: string): void {
    localStorage.setItem('refreshToken', input);
  }
}

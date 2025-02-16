import { Injectable } from '@angular/core';
import {LOGO, LOGO_MEDIUM, LOGO_SMALL} from '../header/logos';
import {Svg} from '../../models/svg.model';
import {MEDIA_BREAKPOINTS} from '../../../environments/constants';
import {BANNER, BANNER_SMALL} from '../../pages/welcome/welcome-page/banners';

@Injectable({
	providedIn: 'root'
})
export class ResizeService {
  innerWidth: number;
  innerHeight: number;

  logo: Svg;
  isMobile: boolean;

  banner: Svg;

  constructor() {
  	this.onResize();
  }

  /**
   * called on window resize and handles all resize action
   */
  onResize(): void{
  	this.innerWidth = window.innerWidth;
  	this.innerHeight= window.innerHeight;

  	this.actualizePictures();
  }

  /**
   * Get the actual pictures for the screen size
   */
  actualizePictures(): void{
  	if(innerWidth < MEDIA_BREAKPOINTS.small) {
  		this.logo =  LOGO_SMALL;
  		this.banner = BANNER_SMALL;
  		this.isMobile = true;
  	}
  	else if(innerWidth < MEDIA_BREAKPOINTS.medium) {
  		this.logo =  LOGO_MEDIUM;
  		this.banner = BANNER;
  		this.isMobile = false;
  	}
  	else {
  		this.logo =  LOGO;
  		this.banner = BANNER;
  		this.isMobile = false;
  	}
  }
}

import { Injectable } from '@angular/core';
import {LOGO, LOGO_MEDIUM, LOGO_SMALL} from "../header/logos";
import {Svg} from "../../models/svg.model";
import {MEDIA_BREAKPOINTS} from "../../../environments/constants";

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  innerWidth: number;
  innerHeight: number;

  logo: Svg;
  isMobile: boolean

  constructor() {
    this.onResize();
  }

  /**
   * called on window resize and handles all resize action
   */
  onResize(): void{
    this.innerWidth = window.innerWidth;
    this.innerHeight= window.innerHeight;

    this.actualizeLogo();
  }

  /**
   * Get the actual logo for the screen size
   */
  actualizeLogo(): void{
    if(innerWidth < MEDIA_BREAKPOINTS.small) {
      this.logo =  LOGO_SMALL;
      this.isMobile = true;
    }
    else if(innerWidth < MEDIA_BREAKPOINTS.medium) {
      this.logo =  LOGO_MEDIUM;
      this.isMobile = false;
    }
    else {
      this.logo =  LOGO;
      this.isMobile = false;
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {Svg} from "../../models/svg.model";
import {LOGO, LOGO_MEDIUM, LOGO_SMALL,} from "./logos";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  logo: Svg;

  constructor() {
  }

  ngOnInit(): void {
    this.onResize();
  }

  /**
   * Handles the logo size
   */
  onResize(): void {
    const innerWidth = window.innerWidth;

    if(innerWidth < 490) this.logo = LOGO_SMALL;
    else if(innerWidth < 1024) this.logo = LOGO_MEDIUM;
    else this.logo = LOGO;
  }

}

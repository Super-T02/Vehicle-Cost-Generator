import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  logoWidth: number;
  actualLogo: string;

  constructor() {
  }

  ngOnInit(): void {
    this.onResize();
  }

  onResize(): void {
    const innerWidth = window.innerWidth;

    if(innerWidth < 550){
      this.logoWidth = 57;
      this.actualLogo = 'logo-small';
    }
    else if(innerWidth < 1050) {
      this.logoWidth = 100;
      this.actualLogo = 'logo-medium';
    }
    else {
      this.actualLogo = 'logo';
      this.logoWidth = 400;
    }
  }

}

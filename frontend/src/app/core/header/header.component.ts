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
    this.actualLogo = "logo";
    this.logoWidth = 400;
  }

}

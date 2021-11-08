import {Component, OnInit} from '@angular/core';
import {Svg} from '../../models/svg.model';
import {pageNotFoundSvg} from './page-not-found-svg';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.less']
})
export class PageNotFoundComponent implements OnInit {

  picture: Svg = pageNotFoundSvg;

  constructor() {
  }

  ngOnInit(): void {
  }

}

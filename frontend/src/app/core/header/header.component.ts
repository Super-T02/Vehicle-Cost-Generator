import {Component, OnInit} from '@angular/core';
import {Svg} from "../../models/svg.model";
import {LOGO, LOGO_MEDIUM, LOGO_SMALL,} from "./logos";
import {ResizeService} from "../services/resize.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(public resizeService: ResizeService) {
  }

  ngOnInit(): void {
  }
}

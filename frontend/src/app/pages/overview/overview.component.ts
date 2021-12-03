import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Vehicle} from '../../models/vehicle.model';
import {ApiService} from '../../core/services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit {
  vehicles: Vehicle[];


  constructor(
    public auth: AuthService,
    private api: ApiService,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.vehicles = [];
    this.loadVehicles();
  }

  /**
   * Loads the vehicles from the api
   */
  loadVehicles(): void {
    this.api.getVehicles(this.auth.username).subscribe(result => {
        this.vehicles = result.data;
      },
      error => {
        if (error.code === 403) {
          this.auth.handleAuthError(error);
        } else {
          throw(error);
        }
      });
  }

  /**
   * Navigate to addVehicle
   */
  addVehicle() {
    this.route.navigate(['addVehicle']).then();
  }
}

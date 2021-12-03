import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Vehicle} from '../../models/vehicle.model';
import {ApiService} from '../../core/services/api.service';
import {AuthService} from '../../core/services/auth.service';
import { Subject} from 'rxjs';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.less']
})
export class UpdateVehicleComponent implements OnInit {
  vehicle: Subject<Vehicle> = new Subject<Vehicle>();
  dataLoaded: boolean = false;


  constructor(
    private api: ApiService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.api.getVehicle(this.auth.username, params.vin).subscribe(
        value => {
          this.vehicle.next(value.data[0]);
          this.dataLoaded = true;
        }
      );
    });

  }

}

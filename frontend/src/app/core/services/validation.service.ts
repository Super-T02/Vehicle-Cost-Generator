import { Injectable } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiService} from './api.service';

@Injectable({
	providedIn: 'root'
})
export class ValidationService {

	constructor(
    private api: ApiService
  ) { }

}

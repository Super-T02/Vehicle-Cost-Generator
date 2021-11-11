import { Injectable } from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class ValidationService {

	constructor() { }

	// TODO: Service for checking existing userNames
	isNameUsed(name: string): boolean{
		return false;
	}
}

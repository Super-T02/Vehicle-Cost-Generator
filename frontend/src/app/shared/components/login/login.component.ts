import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../core/services/validation.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(private fb: FormBuilder,
              private validateService: ValidationService) { }

  ngOnInit(): void {
  	this.login = this.fb.group({
  		nickname: [null, Validators.required], // TODO: Service for validating data
  		password: [null, Validators.required]
  	});
  }

  onSubmit(): void {
  	console.log('login!');
  	console.log(this.login);

  	for (const i in this.login.controls) {
  		if (this.login.controls.hasOwnProperty(i)) {
  			this.login.controls[i].markAsDirty();
  			this.login.controls[i].updateValueAndValidity();
  		}
  	}
  }

}

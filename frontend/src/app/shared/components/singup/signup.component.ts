import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../core/services/validation.service';
import {ApiService} from '../../../core/services/api.service';
import {CreateUserInput} from '../../../models/user.model';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ApiError} from '../../../models/api.model';
import {Router} from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  @Input() description: boolean;

  collNormal: number;
  collSmall: number;
  offsetButton: number;

  signup: FormGroup;
  success: boolean;
  error: ApiError;
  classList: String[];

  constructor(private fb: FormBuilder,
              private validateService: ValidationService,
              private apiService: ApiService,
              private message: NzMessageService,
              private router: Router) { }

  ngOnInit(): void {
    // Generate Layout for the from
    if (this.description == undefined) {
      this.description = false;
      this.classList = ['no-description'];
    } else if (this.description) {
      this.offsetButton = 6;
      this.collNormal = 14;
      this.collSmall = 24;
    }

    // Define form
  	this.signup = this.fb.group({
  		username: [null, [Validators.required, this.checkUser]],
  		email: [null, [Validators.email, Validators.required]],
  		password: [null, [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[ \]:;<>,?\/~_+-=|\\]).{8,32}/)]],
  		passwordCheck: [null, [Validators.required, this.confirmationValidator]]
  	});

    // Setting defaults
    this.success = false;
  }

  /**
   * Defines what happens after the submit of the Form
   */
  onSubmit(): void {
    // Validate Form
  	for (const i in this.signup.controls) {
  		if (this.signup.controls.hasOwnProperty(i)) {
  			this.signup.controls[i].markAsDirty();
  			this.signup.controls[i].updateValueAndValidity();
  		}
  	}

  	const form = this.signup.value;
  	const data: CreateUserInput = {
  		username: form.username,
  		email: form.email,
  		password: form.password,
  		passwordCheck: form.passwordCheck,
  		role: 'member'
  	};


    // Send Request
    this.apiService.createUser(data)
      .subscribe((output) => {
        console.log(output);
        this.message.create('success', 'Successfully signed Up!');
        this.signup.reset();
        this.success = true;

        // Redirect to Login after 5 seconds
        setTimeout(() => this.router.navigate(['/login']).then(), 5000);
      }, (err) => {
        this.error = err;
      });
  }

  /**
   * Validates if the passwords equals each other
   * @param control
   */
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
  	if (!control.value) {
  		return { required: true };
  	}
  	else if (control.value !== this.signup.controls.password.value) {
  		return { confirm: true, error: true };
  	}
  	return {};
  };

  /**
   * Validates if the user isn't used yet
   * @param control
   */
  checkUser = (control: FormControl): { [s: string]: boolean } => {
  	if(!control.value) {
  		return {require: true};
  	}
  	else if(this.validateService.isNameUsed(control.value)) {
  		return { confirm: true, error: true };
  	}
  	return {};
  }

}


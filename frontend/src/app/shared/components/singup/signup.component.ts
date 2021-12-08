import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../core/services/api.service';
import {CreateUserInput} from '../../../models/user.model';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  @Input() description: boolean;
  @Output() submitted = new EventEmitter<boolean>();

  collNormal: number;
  collSmall: number;
  offsetButton: number;


  signup: FormGroup;
  classList: String[];

  constructor(private fb: FormBuilder,
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
  		username: [null, [Validators.required]],
  		email: [null, [Validators.email, Validators.required]],
  		password: [null, [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[ \]:;<>,?\/~_+-=|\\]).{8,32}/)]],
  		passwordCheck: [null, [Validators.required, this.confirmationValidator]]
  	});

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
        this.signup.reset();
        this.submitted.emit(true);
      }, (err) => {
        this.submitted.emit(false);
        this.message.error(err.message, {nzDuration: 3000});
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

}


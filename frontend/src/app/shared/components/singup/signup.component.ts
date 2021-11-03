import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {ValidationService} from "../../../core/services/validation.service";

@Component({
  selector: 'app-singup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  signup: FormGroup;

  constructor(private fb: FormBuilder,
              private validateService: ValidationService) { }

  ngOnInit(): void {
    this.signup = this.fb.group({
      nickname: [null, [Validators.required, this.checkUser]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[ \]:;<>,?\/~_+-=|\\]).{8,32}/)]],
      passwordCheck: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  /**
   * Defines what happens after the submit of the Form
   */
  onSubmit(): void {
    console.log("submitted!");
    console.log(this.signup);

    for (const i in this.signup.controls) {
      if (this.signup.controls.hasOwnProperty(i)) {
        this.signup.controls[i].markAsDirty();
        this.signup.controls[i].updateValueAndValidity();
      }
    }
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


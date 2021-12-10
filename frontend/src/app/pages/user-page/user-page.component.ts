import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {ApiService} from '../../core/services/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.less']
})
export class UserPageComponent implements OnInit {
  visible: boolean = false;
  loaded: boolean = false;
  userData: User;
  editForm: FormGroup

  constructor(
    public auth: AuthService,
    private api: ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.api.getUser(this.auth.username).subscribe( value => {
      this.userData = value.data[0];

      this.editForm.setValue({
        username: this.userData.username,
        email: this.userData.email,
        password: this.userData.password,
        passwordCheck: null
      });

      this.loaded = true;
    });

    this.editForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[ \]:;<>,?\/~_+-=|\\]).{8,32}/)]],
      passwordCheck: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  /**
   * Handles Submit of form
   */
  handleSubmit() {
    this.visible = false;
  }

  /**
   * Handles Cancel of form
   */
  handleCancel() {
    this.visible = false;
  }

  /**
   * Handle edit request
   */
  handleEdit() {
    this.visible = true;
  }



  /**
   * Validates if the passwords equals each other
   * @param control
   */
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    }
    else if (control.value !== this.editForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}

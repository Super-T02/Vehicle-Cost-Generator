import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {ApiService} from '../../core/services/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateUserInput, User} from '../../models/user.model';
import {ResizeService} from '../../core/services/resize.service';
import {UtilService} from '../../core/services/util.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.less']
})
export class UserPageComponent implements OnInit {
  visible: boolean = false;
  loaded: boolean = false;
  tableLoaded: boolean = false;
  users: User[] = [];
  cache: {[username: string]: {edit: boolean, data: User}} = {};
  userData: User;
  editForm: FormGroup

  constructor(
    public auth: AuthService,
    private api: ApiService,
    private fb: FormBuilder,
    public resize: ResizeService,
    private util: UtilService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.api.getUser(this.auth.username).subscribe( value => {
      this.userData = value.data[0];
      this.setDataForForm();
      this.loaded = true;
      if(this.userData.role === 'admin') {
        this.loadAllUsers();
      } else {
        this.users = undefined;
        this.tableLoaded = false;
      }
    });

    this.editForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[ \]:;<>,?\/~_+-=|\\]).{8,32}/)]],
      passwordCheck: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  /**
   * Set the data of the form to the given one
   */
  setDataForForm(): void{
    this.editForm.setValue({
      email: this.userData.email,
      password: this.userData.password,
      passwordCheck: null
    });
  }

  /**
   * Handles Submit of form
   */
  handleSubmit(): void{
    // Validate Form
    for (const i in this.editForm.controls) {
      if (this.editForm.controls.hasOwnProperty(i)) {
        this.editForm.controls[i].markAsDirty();
        this.editForm.controls[i].updateValueAndValidity();
      }
    }

    if(this.editForm.valid){
      const form = this.editForm.value;
      const data: CreateUserInput = {
        username: this.userData.username,
        email: form.email,
        password: form.password,
        passwordCheck: form.passwordCheck,
        role: this.userData.role
      };

      this.api.updateUser(data.username, data).subscribe( () => {
        this.api.logout(this.util.getRefreshToken()).subscribe(() => {
          this.util.setRefreshToken('');
          this.util.setAccessToken('');

          this.api.login({username: data.username, password: data.password}).subscribe( (output) => {
            this.util.setAccessToken(output.data.accessToken);
            this.util.setRefreshToken(output.data.refreshToken);
            this.message.success('Personal data updated successfully!', {nzDuration: 3000});
            this.auth.authenticated = true;
            this.auth.actualizeName();
            this.userData = data;
            this.visible = false;
          });
        });
      }, error => {
        this.message.error(error.message, {nzDuration: 5000});
      });
    }
  }

  /**
   * Handles Cancel of form
   */
  handleCancel(): void{
    this.visible = false;
    this.setDataForForm();
  }

  /**
   * Handle edit request
   */
  handleEdit(): void{
    this.visible = true;
  }

  /**
   * Shows a confirm for delete
   */
  showDeleteConfirm(): void{
    this.modal.confirm({
      nzTitle: 'Are you sure delete this account?',
      nzContent: 'Are you sure to delete your complete account with all vehicles and data. This decision ist final!',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteAccount(),
      nzCancelText: 'Cancel'
    });
  }

  /**
   * Deletes the account
   */
  deleteAccount(): void {
    this.api.deleteUser(this.userData.username).subscribe(() => {
      this.api.logout(this.util.getRefreshToken()).subscribe(() => {
        this.util.setRefreshToken('');
        this.util.setAccessToken('');
        let mod: NzModalRef = this.modal.info({
          nzTitle: 'Account deleted',
          nzContent: 'Your account, vehicles and costs are successfully deleted. You will be redirected to the login screen!',
          nzOkText: 'Ok',
          nzClosable: false,
          nzOnOk: () => this.router.navigate(['/login']).then(() => mod.close())
        });
      }, error => {
        this.util.setRefreshToken('');
        this.util.setAccessToken('');
        let mod: NzModalRef = this.modal.info({
          nzTitle: 'Account deleted',
          nzContent: 'Your account, vehicles and costs are successfully deleted. You will be redirected to the login screen!',
          nzOkText: 'Ok',
          nzClosable: false,
          nzOnOk: () => this.router.navigate(['/login']).then(() => mod.close())
        });
      });
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
    else if (control.value !== this.editForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  /**
   * Loads all users
   */
  loadAllUsers(): void{
    this.api.getAllUsers().subscribe( response => {
      this.users = response.data as User[];
      for (const user of response.data as User[]) {
        this.cache[user.username] = {
          edit: false,
          data: user
        };
      }

      this.tableLoaded = true;
    }, error => {
        this.message.error('Not able to load users, please try again later', {nzDuration: 5000});
      }
    );
  }

  /**
   * Save the edit for the admin table
   * @param username
   */
  saveEdit(username: string): void{
    const actualCache = this.cache[username].data;
    const updatedUser: CreateUserInput = {
      email: actualCache.email,
      password: actualCache.password,
      passwordCheck: actualCache.password,
      role: actualCache.role,
      username: actualCache.username
    };


    this.api.updateUser(username, updatedUser).subscribe(() => {
      this.message.success(`User ${username} successfully updated!`, {nzDuration: 3000});
      const index = this.users.findIndex(user => user.username === username);
      if(index === -1) {
        this.tableLoaded = false;
        this.loadAllUsers();
      }
      else {
        this.users[index] = this.cache[username].data;
        console.log(this.cache);
        this.cache[username].edit = false;
      }
    });
  }

  /**
   * Starts the edit of the admin table
   * @param username
   */
  startEdit(username: string): void{
    this.cache[username].edit = true;
  }

  /**
   * Cancel the edit of the admin table
   * @param username
   */
  cancelEdit(username: string): void {
    this.cache[username].edit = false;
    const index = this.users.findIndex(user => user.username === username);
    if(index === -1){
      this.message.error('Oh there is a problem with the table, it will be reloaded', {nzDuration: 5000});
      this.tableLoaded = false;
      this.loadAllUsers();
    } else {
      this.cache[username].data = this.users[index];
    }
  }
}

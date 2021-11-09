import {ApiError} from './api.model';

export interface CreateUserInput {
  username: string,
  email: string,
  password: string,
  passwordCheck: string,
  role: string
}

export interface CreateUserOutput {
  data: string
}

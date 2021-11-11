export interface ApiError {
  code: number,
  title: string,
  message: string
}

export interface LoginInput {
  username: string,
  password: string
}

export interface ApiOutput {
  data: any
}

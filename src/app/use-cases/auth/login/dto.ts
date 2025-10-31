export interface LoginUseCaseDto {
  email: string;
  password: string;
}

export interface LoginUseCaseResponse {
  access_token: string;
  account_id: string;
  account_type: string;
}

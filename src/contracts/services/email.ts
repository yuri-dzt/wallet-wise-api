export interface ResetPasswordProps {
  token: string
  email: string
}

export interface IEmailService {
  resetPassword(props: ResetPasswordProps): Promise<void>;
  activeAccount(email: string): Promise<void>;
}

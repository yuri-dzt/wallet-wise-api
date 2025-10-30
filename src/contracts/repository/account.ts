import { AccountType } from "../enums/account-type"

export interface FindByAccountResponse {
  account_type: AccountType
  account_password?: string
  account_id: string
}

export interface IAccountRepository {
  isEmailAlreadyRegistered: (email: string) => Promise<boolean>
  findByEmail: (email: string) => Promise<FindByAccountResponse | undefined>
}
import { randomUUID } from "node:crypto";

import { Account, AccountProps } from "../../../core/account";

export type IUser = AccountProps & {
  token?: string
}

export type CreateUserProps = Omit<IUser, "id" | 'created_at' | 'token'> & {
  id?: string
  created_at?: number
  token?: string
}

export type UserCollection = User[];

export class User extends Account<IUser> {
  get token() {
    return this.props.token;
  }

  constructor(props: CreateUserProps) {
    super({
      ...props,
      id: props.id || randomUUID(),
      created_at: props.created_at || Date.now(),
    })
  }

  async createResetPasswordToken(): Promise<void> {
    this.props.token = randomUUID();
  }

  async clearResetPasswordToken(): Promise<void> {
    this.props.token = undefined;
  }
}
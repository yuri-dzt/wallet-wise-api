import { randomUUID } from "node:crypto";

import { Account, AccountProps } from "../../../core/account";

export type IUser = AccountProps & {
  token?: string
  active?: boolean
}

export type CreateUserProps = Omit<IUser, "id" | 'created_at' | 'token'> & {
  id?: string
  created_at?: number
  token?: string
  active?: boolean
}

export type UserCollection = User[];

export class User extends Account<IUser> {
  get token() {
    return this.props.token;
  }

  get active() {
    return this.props.active;
  }

  constructor(props: CreateUserProps) {
    super({
      ...props,
      id: props.id || randomUUID(),
      active: props.active || false,
      created_at: props.created_at || Date.now(),
    })
  }

  async createResetPasswordToken(): Promise<void> {
    this.props.token = randomUUID();
    this.props.updated_at = Date.now();
  }

  async clearResetPasswordToken(): Promise<void> {
    this.props.token = undefined;
    this.props.updated_at = Date.now();
  }

  async updateActive(status: boolean): Promise<void> {
    this.props.active = status;
    this.props.updated_at = Date.now();
  }
}
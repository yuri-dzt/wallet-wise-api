import { randomUUID } from "node:crypto";

import { Account, AccountProps } from "../../../core/account";

export type IUser = AccountProps & {}

export type CreateUserProps = Omit<IUser, "id" | 'created_at'> & {
  id?: string
  created_at?: number
}

export type UserCollection = User[];

export class User extends Account<IUser> {
  constructor(props: CreateUserProps) {
    super({
      ...props,
      id: props.id || randomUUID(),
      created_at: props.created_at || Date.now(),
    })
  }
}
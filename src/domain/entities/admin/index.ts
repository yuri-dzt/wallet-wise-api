import { randomUUID } from "node:crypto";

import { Account, AccountProps } from "../../../core/account";

export type IAdmin = AccountProps & {
  permission: number
};

export type CreateAdminProps = Omit<IAdmin, "id" | 'created_at'> & {
  id?: string
  created_at?: number
  permission: number
}

export type AdminCollection = Admin[];

export class Admin extends Account<IAdmin> {
  get permission() {
    return this.props.permission;
  }

  constructor(props: CreateAdminProps) {
    super({
      ...props,
      id: props.id || randomUUID(),
      created_at: props.created_at || Date.now(),
      permission: props.permission
    })
  }

  updatePermission(permission: number) {
    this.props.permission = permission;
  }
}
import { UserCollection } from "../../../src/domain/entities/user";
import { AdminCollection } from "../../../src/domain/entities/admin";
import { AccountType } from "../../../src/contracts/enums/account-type";
import { FindByAccountResponse, IAccountRepository } from "../../../src/contracts/repository/account";

export class InMemoryAccountRepository implements IAccountRepository {
  public admins: AdminCollection = [];
  public users: UserCollection = [];

  async isEmailAlreadyRegistered(email: string): Promise<boolean> {
    const existAdmin = this.admins.find(admin => admin.email === email);
    const existUser = this.users.find(user => user.email === email);

    return existAdmin || existUser ? true : false;
  }

  async findByEmail(email: string): Promise<FindByAccountResponse | undefined> {
    const existAdmin = this.admins.find(c => c.email === email);
    const existUser = this.users.find(c => c.email === email);

    let account_id = '';
    let account_password = '';
    let account_type = '' as AccountType;

    if (existAdmin) {
      account_id = existAdmin.id;
      account_password = existAdmin.password;
      account_type = 'admin' as AccountType;
    } else if (existUser) {
      account_id = existUser.id;
      account_password = existUser.password;
      account_type = 'analyst' as AccountType;
    } else {
      return;
    }

    return {
      account_id,
      account_password,
      account_type,
    }
  }
}

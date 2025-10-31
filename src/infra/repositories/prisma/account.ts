import { prisma } from "../../../core/prisma/client";
import { PrismaError } from "../../../core/prisma/error";
import { AccountType } from "../../../contracts/enums/account-type";
import { FindByAccountResponse, IAccountRepository } from "../../../contracts/repository/account";

export class PrismaAccountRepository implements IAccountRepository {
  async findByEmail(email: string): Promise<FindByAccountResponse | undefined> {
    try {
      const adminExists = await prisma.admin.findUnique({
        where: { email }
      })
      if (adminExists) {
        return {
          account_id: adminExists.id,
          account_password: adminExists.password,
          account_type: AccountType.ADMIN
        }
      }

      const providerExists = await prisma.user.findUnique({
        where: { email }
      })
      if (providerExists) {
        return {
          account_id: providerExists.id,
          account_password: providerExists.password,
          account_type: AccountType.USER
        }
      }

    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async isEmailAlreadyRegistered(email: string): Promise<boolean> {
    try {
      const adminExists = await prisma.admin.findUnique({
        where: { email }
      })

      const userExists = await prisma.user.findUnique({
        where: { email }
      })

      const hasAdmin = adminExists !== null;
      const hasUser = userExists !== null;

      const hasAccount = hasAdmin || hasUser

      return hasAccount

    } catch (err) {
      console.log((err as PrismaError).message);
      return false
    }
  }
}


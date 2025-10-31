import { LoginUseCaseError } from './error';
import { LoginUseCaseDto, LoginUseCaseResponse } from "./dto";
import { IJwtService } from "../../../../contracts/services/jwt";
import { IHashService } from "../../../../contracts/services/hash";
import { IAccountRepository } from "../../../../contracts/repository/account";

export class LoginUseCase {
  constructor(
    private readonly accountRepo: IAccountRepository,
    private readonly hashService: IHashService,
    private readonly jwtService: IJwtService
  ) { }

  async execute(props: LoginUseCaseDto): Promise<LoginUseCaseError | LoginUseCaseResponse> {
    const account = await this.accountRepo.findByEmail(props.email)
    if (!account) {
      return new LoginUseCaseError("Invalid credentials!")
    }

    if (account.account_password) {
      const isPasswordCorrect = await this.hashService.compare(props.password, account.account_password)

      if (!isPasswordCorrect) {
        return new LoginUseCaseError("Invalid credentials")
      }

      const token = this.jwtService.sign({
        account_id: account.account_id,
        account_type: account.account_type,
      })

      return {
        access_token: token,
        account_id: account.account_id,
        account_type: account.account_type
      }
    }

    return new LoginUseCaseError("Invalid credentials")
  }
}
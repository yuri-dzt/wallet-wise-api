import { DeleteExpenseDto } from "./dto";
import { DeleteExpenseUseCaseError } from "./error";
import { IUserRepository } from "../../../../contracts/repository/user";
import { IExpenseRepository } from "../../../../contracts/repository/expense";

export class DeleteExpenseUseCase {
  constructor(
    private readonly expenseRepo: IExpenseRepository,
    private readonly userRepo: IUserRepository,
  ) { }

  async execute(props: DeleteExpenseDto): Promise<undefined | DeleteExpenseUseCaseError> {
    try {
      const userExist = await this.userRepo.findById(props.user_id);
      if (!userExist) {
        return new DeleteExpenseUseCaseError("User not found");
      }

      const expenseExists = await this.expenseRepo.findById(props.expense_id);
      if (!expenseExists) {
        return new DeleteExpenseUseCaseError("Expense not found");
      }

      const expenseBelongToUser = expenseExists.user_id === props.user_id;
      if (!expenseBelongToUser) {
        return new DeleteExpenseUseCaseError("Unauthorized");
      }

      await this.expenseRepo.delete(props.expense_id);
      return undefined

    } catch {
      return new DeleteExpenseUseCaseError("Error occurred while deleting expense");
    }
  }
}

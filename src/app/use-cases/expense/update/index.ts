import { UpdateExpenseDto } from "./dto";
import { UpdateExpenseUseCaseError } from "./error";
import { IExpenseDto } from "../../../../contracts/dtos/expense";
import { ExpenseMapper } from "../../../../contracts/mappers/expense";
import { IUserRepository } from "../../../../contracts/repository/user";
import { IExpenseRepository } from "../../../../contracts/repository/expense";
import { ICategoryRepository } from "../../../../contracts/repository/category";

export class UpdateExpenseUseCase {
  constructor(
    private readonly expenseRepo: IExpenseRepository,
    private readonly userRepo: IUserRepository,
    private readonly categoryRepo: ICategoryRepository,
  ) { }

  async execute(props: UpdateExpenseDto): Promise<IExpenseDto | UpdateExpenseUseCaseError> {
    try {
      const expenseExist = await this.expenseRepo.findById(props.id);
      if (!expenseExist) {
        return new UpdateExpenseUseCaseError("Expense not found");
      }

      const userExist = await this.userRepo.findById(props.user_id);
      if (!userExist) {
        return new UpdateExpenseUseCaseError("User not found");
      }

      if (props.date) {
        expenseExist.updateDate(props.date);
      }

      if (props.price) {
        expenseExist.updatePrice(props.price);
      }

      if (props.category_id) {
        const categoryExist = await this.categoryRepo.findById(props.category_id);
        if (!categoryExist) {
          return new UpdateExpenseUseCaseError("Category not found");
        }

        expenseExist.updateCategory(props.category_id);
      }

      await this.expenseRepo.update(expenseExist);
      return ExpenseMapper.toDto(expenseExist);

    } catch {
      return new UpdateExpenseUseCaseError("Error occurred while updating expense");
    }
  }
}

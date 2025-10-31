import { CreateExpenseDto } from "./dto";
import { CreateExpenseUseCaseError } from "./error";
import { Expense } from "../../../../domain/entities/expense";
import { IExpenseDto } from "../../../../contracts/dtos/expense";
import { ExpenseMapper } from "../../../../contracts/mappers/expense";
import { IUserRepository } from "../../../../contracts/repository/user";
import { IExpenseRepository } from "../../../../contracts/repository/expense";
import { ICategoryRepository } from "../../../../contracts/repository/category";

export class CreateExpenseUseCase {
  constructor(
    private readonly expenseRepo: IExpenseRepository,
    private readonly userRepo: IUserRepository,
    private readonly categoryRepo: ICategoryRepository,
  ) { }

  async execute(props: CreateExpenseDto): Promise<IExpenseDto | CreateExpenseUseCaseError> {
    try {
      const userExist = await this.userRepo.findById(props.user_id);
      if (!userExist) {
        return new CreateExpenseUseCaseError("User not found");
      }

      const categoryExist = await this.categoryRepo.findById(props.category_id);
      if (!categoryExist) {
        return new CreateExpenseUseCaseError("Category not found");
      }

      const expense = new Expense({
        user_id: props.user_id,
        category_id: props.category_id,
        date: props.date,
        price: props.price,
      })

      await this.expenseRepo.create(expense);
      return ExpenseMapper.toDto(expense);

    } catch {
      return new CreateExpenseUseCaseError("Error occurred while creating expense");
    }
  }
}

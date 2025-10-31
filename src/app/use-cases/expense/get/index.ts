import { GetExpensesDto } from "./dto";
import { GetExpensesUseCaseError } from "./error";
import { IExpenseDto } from "../../../../contracts/dtos/expense";
import { ExpenseMapper } from "../../../../contracts/mappers/expense";
import { IExpenseRepository } from "../../../../contracts/repository/expense";

export class GetExpensesUseCase {
  constructor(
    private readonly expenseRepo: IExpenseRepository
  ) { }

  async execute(props?: GetExpensesDto): Promise<IExpenseDto[] | GetExpensesUseCaseError> {
    try {
      const expenses = await this.expenseRepo.getAll(props);
      if (expenses.length === 0) return [];

      return expenses.map(ExpenseMapper.toDto)
    } catch {
      return new GetExpensesUseCaseError("Occurred an error getting expenses");
    }
  }
}

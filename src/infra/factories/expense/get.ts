import { GetExpenseController } from "../../controllers/expense/get";
import { GetExpensesUseCase } from "../../../app/use-cases/expense/get";
import { PrismaExpenseRepository } from "../../repositories/prisma/expense";

export const GetExpenseControllerFactory = () => {
  const expenseRepo = new PrismaExpenseRepository();
  const useCase = new GetExpensesUseCase(
    expenseRepo
  );
  return new GetExpenseController(useCase);
};

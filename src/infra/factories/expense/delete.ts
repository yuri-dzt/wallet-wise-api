import { PrismaUserRepository } from "../../repositories/prisma/user";
import { DeleteExpenseController } from "../../controllers/expense/delete";
import { PrismaExpenseRepository } from "../../repositories/prisma/expense";
import { DeleteExpenseUseCase } from "../../../app/use-cases/expense/delete";

export const DeleteExpenseControllerFactory = () => {
  const expenseRepo = new PrismaExpenseRepository();
  const userRepo = new PrismaUserRepository();
  const useCase = new DeleteExpenseUseCase(
    expenseRepo,
    userRepo
  );
  return new DeleteExpenseController(useCase);
};

import { PrismaUserRepository } from "../../repositories/prisma/user";
import { CreateExpenseController } from "../../controllers/expense/create";
import { PrismaExpenseRepository } from "../../repositories/prisma/expense";
import { CreateExpenseUseCase } from "../../../app/use-cases/expense/create";
import { PrismaCategoryRepository } from "../../repositories/prisma/category";

export const CreateExpenseControllerFactory = () => {
  const expenseRepo = new PrismaExpenseRepository();
  const userRepo = new PrismaUserRepository();
  const categoryRepo = new PrismaCategoryRepository();
  const useCase = new CreateExpenseUseCase(
    expenseRepo,
    userRepo,
    categoryRepo,
  );
  return new CreateExpenseController(useCase);
};

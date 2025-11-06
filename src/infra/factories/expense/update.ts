import { PrismaUserRepository } from "../../repositories/prisma/user";
import { UpdateExpenseController } from "../../controllers/expense/update";
import { PrismaExpenseRepository } from "../../repositories/prisma/expense";
import { UpdateExpenseUseCase } from "../../../app/use-cases/expense/update";
import { PrismaCategoryRepository } from "../../repositories/prisma/category";

export const UpdateExpenseControllerFactory = () => {
  const expenseRepo = new PrismaExpenseRepository();
  const userRepo = new PrismaUserRepository();
  const categoryRepo = new PrismaCategoryRepository();
  const useCase = new UpdateExpenseUseCase(
    expenseRepo,
    userRepo,
    categoryRepo
  );
  return new UpdateExpenseController(useCase);
};

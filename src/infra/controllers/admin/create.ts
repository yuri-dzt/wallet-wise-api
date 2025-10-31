import { CreateAdminDto } from "../../../app/use-cases/admin/create/dto";
import { CreateAdminUseCase } from "../../../app/use-cases/admin/create";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { CreateAdminUseCaseError } from "../../../app/use-cases/admin/create/error";

export class CreateAdminController {
  constructor(private readonly useCase: CreateAdminUseCase) { }

  async handle(props: CreateAdminDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof CreateAdminUseCaseError) {
      return {
        status_code: 400,
        body: {
          message: result.message,
        },
      };
    }

    return {
      status_code: 201,
      body: result,
    };
  }
}

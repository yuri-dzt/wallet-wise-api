import { DeleteAdminUseCase } from "../../../app/use-cases/admin/delete";
import { DeleteAdminDto } from "../../../app/use-cases/admin/delete/dto";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { DeleteAdminUseCaseError } from "../../../app/use-cases/admin/delete/error";

export class DeleteAdminController {
  constructor(private readonly useCase: DeleteAdminUseCase) { }

  async handle(props: DeleteAdminDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof DeleteAdminUseCaseError) {
      return {
        status_code: 400,
        body: {
          message: result.message,
        },
      };
    }

    return {
      status_code: 204,
      body: result,
    };
  }
}

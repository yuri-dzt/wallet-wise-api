import { UpdateAdminUseCase } from "../../../app/use-cases/admin/update";
import { UpdateAdminDto } from "../../../app/use-cases/admin/update/dto";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { UpdateAdminUseCaseError } from "../../../app/use-cases/admin/update/error";

export class UpdateAdminController {
  constructor(private readonly useCase: UpdateAdminUseCase) { }

  async handle(props: UpdateAdminDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof UpdateAdminUseCaseError) {
      return {
        status_code: 400,
        body: {
          message: result.message,
        },
      };
    }

    return {
      status_code: 200,
      body: result,
    };
  }
}

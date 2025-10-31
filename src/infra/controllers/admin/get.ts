import { GetAdminsUseCase } from "../../../app/use-cases/admin/get";
import { GetAdminsDto } from "../../../app/use-cases/admin/get/dto";
import { GetAdminsUseCaseError } from "../../../app/use-cases/admin/get/error";
import { IControllerResponse } from "../../../contracts/controllers/controller";

export class GetAdminsController {
  constructor(private readonly useCase: GetAdminsUseCase) { }

  async handle(props: GetAdminsDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof GetAdminsUseCaseError) {
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

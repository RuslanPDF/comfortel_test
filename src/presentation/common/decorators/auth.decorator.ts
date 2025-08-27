import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ErrorMessageConstants } from "../constants/errorMessage.constants";

export const Auth = () => {
  const decorators = [
    ApiBearerAuth(),
    ApiUnauthorizedResponse({description: ErrorMessageConstants.UNAUTHORIZED_MSG}),
  ];

  return applyDecorators(...decorators);
};

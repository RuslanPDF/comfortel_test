import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { ApiResponse as BaseResponse } from  "../responses/apiResponse.response";


export const ApiOkResponseGeneric = <GenericType extends Type<unknown> | null>(
  data?: GenericType | Type<unknown>[]
) =>
  applyDecorators(
    ApiExtraModels(BaseResponse, ...(Array.isArray(data) ? data : [data || Object])),
    data ?
      ApiResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(BaseResponse) },
            data
              ? Array.isArray(data)
                ? {
                  properties: {
                    data: {
                      type: "array",
                      items: {
                        $ref: getSchemaPath(data[0])
                      }
                    }
                  }
                }
                : {
                  properties: {
                    data: {
                      $ref: getSchemaPath(data)
                    }
                  }
                }
              : {
                properties: {
                  data: { type: "object" }
                }
              }
          ]
        }
      }) :
      ApiResponse({ schema: {
        properties: {
          status: { type: "number" },
          error: {
            type: "array",
            items: {
              type: "string"
            }
          }
        }
        }
      })
  );

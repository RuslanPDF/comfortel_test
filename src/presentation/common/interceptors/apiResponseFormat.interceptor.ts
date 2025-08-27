import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../responses/apiResponse.response';


@Injectable()
export class ApiResponseFormatInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<ApiResponse<any>> {
    const http = context.switchToHttp();
    const response = http.getResponse();

    return next.handle().pipe(
      map((responseData) => {
        const mappedResponse: ApiResponse<typeof responseData> = {
          status: parseInt(response.statusCode),
          data: responseData,
          error: [],
        };

        return mappedResponse;
      }),
    );
  }
}

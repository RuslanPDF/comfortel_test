import { ApiProperty } from '@nestjs/swagger';


export class ApiResponse<TData> {
  @ApiProperty()
  public data: TData | null = null;

  @ApiProperty()
  public status: number;

  @ApiProperty({ type: [String] })
  public error: string[];

  public constructor(
    data: TData | null = null,
    status: number = 200,
    error: string[] = [],
  ) {
    this.data = data;
    this.status = status;
    this.error = error;
  }
}

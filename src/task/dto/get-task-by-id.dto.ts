import { IsNumber } from 'class-validator';

export class GetTaskByIdDto {
  @IsNumber()
  id: number;
}

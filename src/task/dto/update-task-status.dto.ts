import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.types';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

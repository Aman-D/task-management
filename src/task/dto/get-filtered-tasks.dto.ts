import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class GetFilteredTasks {
  @IsOptional()
  search?: string;
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

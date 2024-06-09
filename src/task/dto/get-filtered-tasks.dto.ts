import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.types';

export class GetFilteredTasks {
  @IsOptional()
  search?: string;
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

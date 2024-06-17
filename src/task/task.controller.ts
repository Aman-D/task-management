import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilteredTasks } from './dto/get-filtered-tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt.auth-gaurd';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTask(@Query() filterOptions: GetFilteredTasks, @User() user: UserEntity) {
    return this.taskService.getTasks(filterOptions, user);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity) {
    return this.taskService.getTaskById({ id }, user);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @User() user: UserEntity) {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @User() user: UserEntity,
  ) {
    return this.taskService.updatTaskStatus(
      id,
      updateTaskStatusDto.status,
      user,
    );
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilteredTasks } from './dto/get-filtered-tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTask(@Query() filterOptions: GetFilteredTasks) {
    if (Object.keys(filterOptions).length)
      return this.taskService.getFilteredTasks(filterOptions);
    else return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.getTaskById({ id });
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskService.updatTaskStatus(id, updateTaskStatusDto.status);
  }
}

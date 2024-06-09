import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entites/task.entity';
import { GetTaskByIdDto } from './dto/get-task-by-id.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilteredTasks } from './dto/get-filtered-tasks.dto';
import { TaskStatus } from './task.types';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  getAllTasks() {
    return this.taskRepository.find();
  }

  async getTaskById(getTaskByIdDto: GetTaskByIdDto) {
    const task = await this.taskRepository.findOne({
      where: { id: getTaskByIdDto.id },
    });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  getFilteredTasks(filterOptions: GetFilteredTasks) {
    const { search, status } = filterOptions;
    const query = this.taskRepository.createQueryBuilder('task');
    status && query.andWhere('task.status = :status', { status });
    search &&
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {
          search: `%${search.toLowerCase()}%`,
        },
      );
    return query.getMany();
  }

  async updatTaskStatus(id: number, status: TaskStatus) {
    const task = await this.getTaskById({ id });
    task.status = status;
    return this.taskRepository.save(task);
  }
}

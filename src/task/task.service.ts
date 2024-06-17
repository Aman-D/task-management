import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entites/task.entity';
import { GetTaskByIdDto } from './dto/get-task-by-id.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilteredTasks } from './dto/get-filtered-tasks.dto';
import { TaskStatus } from './task.types';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTaskById(getTaskByIdDto: GetTaskByIdDto, user: UserEntity) {
    const task = await this.taskRepository.findOne({
      where: { id: getTaskByIdDto.id, user },
    });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: UserEntity) {
    const task = this.taskRepository.create({ ...createTaskDto, user });
    return this.taskRepository.save(task);
  }

  getTasks(filterOptions: GetFilteredTasks, user: UserEntity) {
    const { search, status } = filterOptions;
    const query = this.taskRepository.createQueryBuilder('task');

    query.where({ user });

    status && query.andWhere('task.status = :status', { status });

    search &&
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        {
          search: `%${search.toLowerCase()}%`,
        },
      );

    return query.getMany();
  }

  async updatTaskStatus(id: number, status: TaskStatus, user: UserEntity) {
    const task = await this.getTaskById({ id }, user);
    task.status = status;
    return this.taskRepository.save(task);
  }
}

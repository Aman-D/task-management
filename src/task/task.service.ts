import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.entity';
import { v4 as uuidv4 } from 'uuid';
import { GetFilteredTasks } from './dto/get-filtered-tasks.dto';

@Injectable()
export class TaskService {
  private tasks = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string) {
    const allTasks = this.getAllTasks();
    const task = allTasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  getFilteredTasks(filterOptions: GetFilteredTasks) {
    const { search, status } = filterOptions;
    const allTasks = this.getAllTasks();
    const filteredTasks = [];
    if (status) {
      filteredTasks.push(...filteredTasks.filter((t) => t.status === status));
    }
    if (search) {
      filteredTasks.push(
        ...allTasks.filter(
          (t) =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
    return filteredTasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { description, title } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      description,
      title,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(task);
    return task;
  }

  updatTaskStatus(id: string, status: TaskStatus): Task | string {
    const allTasks = this.getAllTasks();
    const task = allTasks.findIndex((t) => t.id === id);
    if (task === -1) return 'Task not found';
    allTasks[task] = {
      ...allTasks[task],
      status: status,
    };
    return allTasks[task];
  }
}

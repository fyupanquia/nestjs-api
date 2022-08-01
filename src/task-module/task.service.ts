import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { TaskDto } from './dto/task.dto';
import { Task } from './interface';
import { TaskStoreService } from './task-store.service';

@Injectable()
export class TaskService {
  constructor(private readonly taskStoreService: TaskStoreService) {}

  public async addTask(task: Task): Promise<Task> {
    task.uuid = uuid();
    task.completed = true;
    task.description = 'aaa';
    task.owner = 'cmb';
    task.duration = 10;
    return this.taskStoreService.addTask(task);
  }
  public async getTask(id: string): Promise<Task> {
    return this.taskStoreService.getTask(id);
  }
  public async deleteTask(id: string): Promise<Task[]> {
    return this.taskStoreService.deleteTask(id);
  }
  public async getAllTasks(): Promise<Task[]> {
    return this.taskStoreService.getAllTasks();
  }
  public async filterTask(filter): Promise<Task[]> {
    return this.taskStoreService.filterTask(filter);
  }
}

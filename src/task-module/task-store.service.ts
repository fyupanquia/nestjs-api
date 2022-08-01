import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { Task } from './interface';

@Injectable()
export class TaskStoreService {
  public tasks: Task[] = [];
  public async addTask(task: TaskDto): Promise<Task> {
    this.tasks.push(task);
    return task;
  }
  public async getTask(id: string): Promise<Task> {
    const task = this.tasks.filter((i) => i.uuid === id);
    if (task && task.length>0) {
      return task[0];
    }
    throw new NotFoundException('Task not found');
  }
  public async deleteTask(id: string): Promise<Task[]> {
    const newTasks = this.tasks.filter((i:Task) => i.uuid !== id);
    this.tasks = newTasks;
    return this.tasks;
  }
  public async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }
  public async filterTask(filter): Promise<Task[]> {
    if (!filter) {
      return Promise.resolve(this.tasks);
    }

    return Promise.resolve(this.tasks.filter((i: Task) => i.duration > 0));
  }
}

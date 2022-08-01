import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './interface';
import { Response } from 'express';
import { QueryParamDto, TaskDto, TaskParamDto } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Res() res: Response) {
    const data = await this.taskService.getAllTasks();
    return res.status(200).send(data);
  }

  @Get('/filter')
  @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
  /*async FilterTaskById(
    @Query('filter') filter: ParseBoolPipe,
    @Res() res: Response,
  ) */
  async FilterTaskById(@Query() reqParam: QueryParamDto, @Res() res: Response) {
    const data = await this.taskService.filterTask(reqParam.filter);
    return res.status(200).send(data);
  }

  @Get(':id')
  async getTaskById(@Param() reqParam: TaskParamDto, @Res() res: Response) {
    const data = await this.taskService.getTask(reqParam.id);
    return res.status(200).send(data);
  }

  @Delete(':id')
  async deleteTaskById(@Param() reqParam: TaskParamDto, @Res() res: Response) {
    const data = await this.taskService.deleteTask(reqParam.id);
    return res.status(200).send(data);
  }

  @Post()
  //@UsePipes(new ValidationPipe())
  async createTask(@Body() task: TaskDto, @Res() res: Response) {
    const data = await this.taskService.addTask(task);
    return res.status(200).send(data);
  }
}

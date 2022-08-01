import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { TaskController } from './task-controller';
import { TaskStoreService } from './task-store.service';
import { TaskService } from './task.service';



@Module({
    imports: [],
    controllers: [TaskController],
    providers: [TaskService, TaskStoreService],
})
export class TaskModule {}

import { Module } from '@nestjs/common';
import { CreateTask } from 'src/application/tasks/use-cases/create-task';
import { DeleteTask } from 'src/application/tasks/use-cases/delete-task';
import { FindManyTasksByOwner } from 'src/application/tasks/use-cases/find-many-tasks-by-owner';
import { UpdateTask } from 'src/application/tasks/use-cases/update-task';
import { DatabaseModule } from '../database/database.module';
import { TasksController } from './controllers/tasks.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [CreateTask, FindManyTasksByOwner, UpdateTask, DeleteTask],
})
export class HttpModule {}

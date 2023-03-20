import { Module } from '@nestjs/common';
import { CreateTask } from 'src/application/tasks/use-cases/create-task';
import { FindManyTasksByOwner } from 'src/application/tasks/use-cases/find-many-tasks-by-owner';
import { DatabaseModule } from '../database/database.module';
import { TasksController } from './controllers/tasks.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [CreateTask, FindManyTasksByOwner],
})
export class HttpModule {}

import { Module } from '@nestjs/common';
import { CreateTask } from 'src/application/tasks/use-cases/create-task';
import { DatabaseModule } from '../database/database.module';
import { TasksController } from './controllers/tasks.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [CreateTask],
})
export class HttpModule {}

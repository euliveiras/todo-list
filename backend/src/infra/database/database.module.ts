import { Module } from '@nestjs/common';
import { TasksRepository } from 'src/application/tasks/repositories/task-repository';
import { PrismaTasksRepository } from './prisma-tasks-repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: TasksRepository,
      useClass: PrismaTasksRepository,
    },
  ],
  exports: [TasksRepository],
})
export class DatabaseModule {}

import { Injectable } from '@nestjs/common';
import { Task } from 'src/application/tasks/entities/task';
import {
  TasksRepository,
  UpdateTaskDTO,
} from 'src/application/tasks/repositories/task-repository';
import { PrismaTasksMapper } from './prisma-tasks-mapper';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  constructor(private prisma: PrismaService) {}
  async create(task: Task): Promise<void> {
    const raw = PrismaTasksMapper.toPrisma(task);
    await this.prisma.task.create({
      data: raw,
    });
  }
  async findManyTasksByOwnerId(ownerId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        ownerId,
      },
    });

    return tasks.map((t) => PrismaTasksMapper.toDomain(t));
  }
  update(id: string, props: UpdateTaskDTO): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  findById(taskId: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  deleteById(taskId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

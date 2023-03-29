import { Injectable } from '@nestjs/common';
import { Task } from 'src/application/tasks/entities/task';
import {
  TasksRepository,
  UpdateTaskDTO,
} from 'src/application/tasks/repositories/task-repository';
import { PrismaTasksMapper } from './prisma-tasks-mapper';
import { PrismaService } from './prisma.service';

type FilterOptions = {
  expiration: Date;
};

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  constructor(private prisma: PrismaService) {}
  async create(task: Task): Promise<void> {
    const raw = PrismaTasksMapper.toPrisma(task);
    await this.prisma.task.create({
      data: raw,
    });
  }
  async findManyTasksByOwnerId(
    ownerId: string,
    filter: FilterOptions,
  ): Promise<Task[]> {
    const start = new Date(filter.expiration);
    const end = new Date(filter.expiration);
    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(23, 59, 59, 999);

    console.log(start);
    console.log(end);
    const tasks = await this.prisma.task.findMany({
      where: {
        ownerId,
        AND: filter.expiration && [
          { expiration: { gte: start } },
          { expiration: { lte: end } },
        ],
      },
    });

    return tasks.map((t) => PrismaTasksMapper.toDomain(t));
  }
  async update(id: string, data: UpdateTaskDTO): Promise<void> {
    await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        additionalInfo: data.additionalInfo,
        label: data.label,
        category: data.category?.category,
        expiration: data.expiration,
      },
    });
  }
  findById(taskId: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  async deleteById(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}

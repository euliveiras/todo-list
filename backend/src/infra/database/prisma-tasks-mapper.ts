import { Task as PrismaTask } from '@prisma/client';
import { Task } from 'src/application/tasks/entities/task';

export class PrismaTasksMapper {
  static toPrisma(task: Task): PrismaTask {
    return {
      id: task.id,
      label: task.label,
      additionalInfo: task.additionalInfo,
      expiration: task.expiration,
      category: task.category.category,
      createdAt: task.createdAt,
      ownerId: task.ownerId,
      updatedAt: task.updatedAt,
    };
  }
}

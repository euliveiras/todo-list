import { Task } from 'src/application/tasks/entities/task';

export class HttpMapper {
  static toHttp(task: Task) {
    return {
      id: task.id,
      category: task.category.category,
      label: task.label,
      additionalInfo: task.additionalInfo,
      createdAt: task.createdAt,
      ownerId: task.ownerId,
      expiration: task.expiration,
    };
  }
}

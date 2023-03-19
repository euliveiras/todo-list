import { Task } from '../entities/task';

export abstract class TaskRepository {
  abstract create(task: Task): Promise<void>;
}

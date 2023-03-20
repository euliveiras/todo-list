import { Category } from '../entities/category';
import { Task } from '../entities/task';

export interface UpdateTaskDTO {
  label: string;
  additionalInfo?: string;
  categories: Category[];
}

export abstract class TasksRepository {
  abstract create(task: Task): Promise<void>;
  abstract update(id: string, props: UpdateTaskDTO): Promise<Task>;
  abstract findById(taskId: string): Promise<Task>;
}

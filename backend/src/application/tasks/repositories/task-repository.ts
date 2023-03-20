import { CategoryType } from '../entities/category';
import { Task } from '../entities/task';

interface UpdateTaskDTO {
  label: string;
  additionalInfo?: string;
  categories: CategoryType[];
}

export abstract class TasksRepository {
  abstract create(task: Task): Promise<void>;
  abstract update(task: UpdateTaskDTO): Promise<Task>;
  abstract findById(taskId: string): Promise<Task>;
}

import { UpdateTaskDTO } from 'src/application/tasks/use-cases/update-task';
import { Task } from '../../src/application/tasks/entities/task';
import { TasksRepository } from '../../src/application/tasks/repositories/task-repository';

export class InMemoryTasksRepository implements TasksRepository {
  private tasks: Task[] = [];

  async update(task: UpdateTaskDTO): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  async findById(taskId: string): Promise<Task> {
    return this.tasks.find((t) => t.id === taskId);
  }
  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }
}

import { Task } from '../../src/application/tasks/entities/task';
import {
  TasksRepository,
  UpdateTaskDTO,
} from '../../src/application/tasks/repositories/task-repository';

type FilterOptions = {
  expiration: Date;
};
export class InMemoryTasksRepository implements TasksRepository {
  private tasks: Task[] = [];

  async findManyTasksByOwnerId(
    ownerId: string,
    filter: FilterOptions,
  ): Promise<Task[]> {
    return this.tasks.filter((t) => {
      if (filter && Object.keys(filter).length > 0) {
        if (t.ownerId === ownerId) {
          return t.expiration.toISOString() === filter.expiration.toISOString();
        }
      } else {
        return t.ownerId === ownerId;
      }
    });
  }
  async deleteById(taskId: string): Promise<void> {
    const newTasks = this.tasks.filter((t) => t.id !== taskId);
    this.tasks = newTasks;
  }

  async update(taskId: string, props: UpdateTaskDTO): Promise<void> {
    const index = this.tasks.findIndex((v) => v.id === taskId);

    if (index === -1) {
      throw new Error('Task not finded');
    }

    const {
      additionalInfo,
      category,
      createdAt,
      expiration,
      id,
      label,
      ownerId,
    } = this.tasks[index];

    const newTask = new Task(
      {
        additionalInfo,
        category,
        createdAt,
        expiration,
        label,
        ownerId,
        ...props,
        updatedAt: new Date(),
      },
      id,
    );

    this.tasks[index] = newTask;
  }
  async findById(taskId: string): Promise<Task> {
    return this.tasks.find((t) => t.id === taskId);
  }
  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }
}

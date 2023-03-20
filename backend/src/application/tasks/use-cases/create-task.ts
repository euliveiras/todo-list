import { Injectable } from '@nestjs/common';
import { Category, CategoryType } from '../entities/category';
import { Task } from '../entities/task';
import { TasksRepository } from '../repositories/task-repository';

interface CreateTaskDTO {
  id?: string;
  label: string;
  additionalInfo?: string;
  expiration: Date;
  categories: CategoryType[];
  ownerId: string;
}

@Injectable()
export class CreateTask {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(task: CreateTaskDTO): Promise<void> {
    const newTask = new Task(
      {
        expiration: task.expiration,
        label: task.label,
        ownerId: task.ownerId,
        additionalInfo: task.additionalInfo,
        categories: task.categories.map((v) => new Category(v)),
      },
      task.id,
    );
    await this.tasksRepository.create(newTask);
  }
}

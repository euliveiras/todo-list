import { Injectable } from '@nestjs/common';
import { Category, CategoryType } from '../entities/category';
import { Task } from '../entities/task';
import { TasksRepository } from '../repositories/task-repository';

interface CreateTaskDTO {
  id?: string;
  label: string;
  additionalInfo?: string;
  expiration: Date;
  category: CategoryType;
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
        category: new Category(task.category),
      },
      task.id,
    );
    await this.tasksRepository.create(newTask);
  }
}

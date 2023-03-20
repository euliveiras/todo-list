import { Injectable } from '@nestjs/common';
import { Category, CategoryType } from '../entities/category';
import { Task } from '../entities/task';
import { TasksRepository } from '../repositories/task-repository';

export interface UpdateTaskDTO {
  label: string;
  additionalInfo?: string;
  categories: CategoryType[];
}

@Injectable()
export class UpdateTask {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(value: UpdateTaskDTO): Promise<{ data: Task }> {
    const updatedTask = await this.tasksRepository.update({
      ...value,
      categories: value.categories.map((v) => new Category(v)),
    });

    return { data: updatedTask };
  }
}

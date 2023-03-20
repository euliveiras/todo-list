import { Injectable } from '@nestjs/common';
import { Category, CategoryType } from '../entities/category';
import { TasksRepository } from '../repositories/task-repository';

export interface UpdateTaskDTO {
  label?: string;
  additionalInfo?: string;
  expiration?: Date;
  category?: CategoryType;
  updatedAt?: Date;
}

@Injectable()
export class UpdateTask {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(id: string, props: UpdateTaskDTO): Promise<void> {
    await this.tasksRepository.update(id, {
      ...props,
      category: props.category ? new Category(props.category) : null,
    });
  }
}

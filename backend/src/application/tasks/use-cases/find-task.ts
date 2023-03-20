import { Injectable } from '@nestjs/common';
import { Task } from '../entities/task';
import { TasksRepository } from '../repositories/task-repository';

@Injectable()
export class FindTaskById {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(id: string): Promise<{ data: Task }> {
    const findedTask = await this.tasksRepository.findById(id);
    return { data: findedTask };
  }
}

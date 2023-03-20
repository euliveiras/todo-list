import { Injectable } from '@nestjs/common';
import { Task } from '../entities/task';
import { TasksRepository } from '../repositories/task-repository';

@Injectable()
export class FindManyTasksByOwner {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(id: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.findManyTasksByOwnerId(id);

    return tasks;
  }
}

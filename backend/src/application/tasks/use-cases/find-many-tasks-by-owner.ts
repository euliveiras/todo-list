import { Injectable } from '@nestjs/common';
import { Task } from '../entities/task';
import { TasksRepository } from '../repositories/task-repository';

type FilterOptions = {
  expiration: Date;
};

@Injectable()
export class FindManyTasksByOwner {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(id: string, filter?: FilterOptions): Promise<Task[]> {
    const tasks = await this.tasksRepository.findManyTasksByOwnerId(id, filter);

    return tasks;
  }
}

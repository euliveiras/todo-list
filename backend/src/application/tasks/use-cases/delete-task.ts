import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../repositories/task-repository';

@Injectable()
export class DeleteTask {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(id: string): Promise<void> {
    await this.tasksRepository.deleteById(id);
  }
}

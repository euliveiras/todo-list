import { Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDTO } from '../dtos/CreateTask';

@Controller('tasks')
export class HttpController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post()
  async createTask(task: CreateTaskDTO) {
    await this.createTask(task);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTask } from 'src/application/tasks/use-cases/create-task';
import { CreateTaskBody } from '../dtos/CreateTaskBody';
import { HttpMapper } from '../mappers/http-mapper';
import { ValidationPipe } from '../validations/validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private createTask: CreateTask) {}
  @Get()
  findAll(): string {
    return 'This action returns all cat';
  }

  @Post()
  async create(@Body(new ValidationPipe()) body: CreateTaskBody) {
    const { category, expiration, label, ownerId, additionalInfo } = body;
    const task = await this.createTask.execute({
      category,
      expiration,
      label,
      ownerId,
      additionalInfo,
    });
    return { data: HttpMapper.toHttp(task) };
  }
}

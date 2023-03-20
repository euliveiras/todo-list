import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTask } from 'src/application/tasks/use-cases/create-task';
import { FindManyTasksByOwner } from 'src/application/tasks/use-cases/find-many-tasks-by-owner';
import { CreateTaskBody } from '../dtos/CreateTaskBody';
import { HttpMapper } from '../mappers/http-mapper';
import { ValidationPipe } from '../validations/validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(
    private createTask: CreateTask,
    private findMany: FindManyTasksByOwner,
  ) {}
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.findMany.execute(id);
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

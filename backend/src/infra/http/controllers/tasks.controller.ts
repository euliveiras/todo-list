import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTask } from 'src/application/tasks/use-cases/create-task';
import { DeleteTask } from 'src/application/tasks/use-cases/delete-task';
import { FindManyTasksByOwner } from 'src/application/tasks/use-cases/find-many-tasks-by-owner';
import { UpdateTask } from 'src/application/tasks/use-cases/update-task';
import { CreateTaskBody } from '../dtos/CreateTaskBody';
import { UpdateTaskBody } from '../dtos/UpdateTaskBody';
import { HttpMapper } from '../mappers/http-mapper';
import { ValidationPipe } from '../validations/validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(
    private createTask: CreateTask,
    private findMany: FindManyTasksByOwner,
    private updateTask: UpdateTask,
    private deleteTask: DeleteTask,
  ) {}
  @Get(':id')
  async findAll(@Param('id') id: string) {
    const tasks = await this.findMany.execute(id);
    return { data: tasks.map((task) => HttpMapper.toHttp(task)) };
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: UpdateTaskBody,
  ) {
    return this.updateTask.execute(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteTask.execute(id);
  }
}

import { InMemoryTasksRepository } from '../../../../test/repositories/In-memory-tasks-repository';
import { CreateTask } from './create-task';

describe('Create task', () => {
  it('should be able to create a task', async () => {
    const createTask = new CreateTask(new InMemoryTasksRepository());

    await createTask.execute({
      categories: ['Business'],
      label: 'study',
      ownerId: 'fake-id',
      expiration: new Date(),
    });
  });
});

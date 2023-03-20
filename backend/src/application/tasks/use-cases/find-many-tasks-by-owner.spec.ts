import { InMemoryTasksRepository } from '../../../../test/repositories/In-memory-tasks-repository';
import { CreateTask } from './create-task';
import { DeleteTask } from './delete-task';
import { FindManyTasksByOwner } from './find-many-tasks-by-owner';
import { FindTaskById } from './find-task';

describe('Find many tasks', () => {
  it('should be able to find tasks', async () => {
    const repository = new InMemoryTasksRepository();
    const createTask = new CreateTask(repository);
    const findManyTasks = new FindManyTasksByOwner(repository);

    await createTask.execute({
      category: 'Business',
      label: 'study',
      ownerId: 'john-doe-id',
      expiration: new Date(),
      id: 'some-id',
    });

    await createTask.execute({
      category: 'Business',
      label: 'study',
      ownerId: 'john-doe-id',
      expiration: new Date(),
      id: 'some-id',
    });

    await createTask.execute({
      category: 'Business',
      label: 'study',
      ownerId: 'john-doe-id',
      expiration: new Date(),
      id: 'some-id',
    });

    const findedTasks = await findManyTasks.execute('john-doe-id');

    expect(findedTasks).toHaveLength(3);
  });
});

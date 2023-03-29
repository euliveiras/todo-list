import { InMemoryTasksRepository } from '../../../../test/repositories/In-memory-tasks-repository';
import { CreateTask } from './create-task';
import { FindManyTasksByOwner } from './find-many-tasks-by-owner';

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
  it('should be able to find a task with a given expiration date', async () => {
    const repository = new InMemoryTasksRepository();
    const createTask = new CreateTask(repository);
    const findManyTasks = new FindManyTasksByOwner(repository);

    await createTask.execute({
      category: 'Business',
      label: 'study',
      ownerId: 'john-doe-id',
      expiration: new Date('2023-03-26'),
      id: 'some-id',
    });

    await createTask.execute({
      category: 'Business',
      label: 'study',
      ownerId: 'john-doe-id',
      expiration: new Date('2023-04-26'),
      id: 'some-id',
    });

    await createTask.execute({
      category: 'Business',
      label: 'study',
      ownerId: 'john-doe-id',
      expiration: new Date('2023-04-26'),
      id: 'some-id',
    });

    const findedTasks = await findManyTasks.execute('john-doe-id', {
      expiration: new Date('2023-04-26'),
    });

    expect(findedTasks).toHaveLength(2);
  });
});

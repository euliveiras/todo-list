import { InMemoryTasksRepository } from '../../../../test/repositories/In-memory-tasks-repository';
import { CreateTask } from './create-task';
import { FindTaskById } from './find-task';
import { UpdateTask } from './update-task';

describe('Update task', () => {
  it('should not be able to update a task when task with given id is not founded', async () => {
    const repository = new InMemoryTasksRepository();
    const createTask = new CreateTask(repository);
    const updateTask = new UpdateTask(repository);

    await createTask.execute({
      category: 'Business',
      label: 'study',
      ownerId: 'john-doe-id',
      expiration: new Date(),
      id: 'some-id',
    });

    expect(() => {
      return updateTask.execute('random-id', {
        category: 'Personal',
        label: 'new-label',
      });
    }).rejects.toThrow();
  });
  it('should be able to update a task', async () => {
    const repository = new InMemoryTasksRepository();
    const findTask = new FindTaskById(repository);
    const createTask = new CreateTask(repository);
    const updateTask = new UpdateTask(repository);

    await createTask.execute({
      category: 'Business',
      label: 'study',
      ownerId: 'john-doe-id',
      expiration: new Date(),
      id: 'some-id',
    });

    updateTask.execute('some-id', {
      category: 'Personal',
      label: 'new-label',
    });

    const { data } = await findTask.execute('some-id');

    expect(data).toHaveProperty('label', 'new-label');
  });
  it('should be able to set task updateAt field to present date', async () => {
    const repository = new InMemoryTasksRepository();
    const findTask = new FindTaskById(repository);
    const createTask = new CreateTask(repository);
    const updateTask = new UpdateTask(repository);

    const updatedAt = new Date();

    await createTask.execute({
      category: 'Business',
      label: 'study',
      ownerId: 'john-doe-id',
      expiration: new Date(),
      id: 'some-id',
    });

    updateTask.execute('some-id', {
      category: 'Personal',
      label: 'new-label',
      updatedAt,
    });

    const { data } = await findTask.execute('some-id');

    expect(data).toHaveProperty('updatedAt', updatedAt);
  });
});

import { InMemoryTasksRepository } from '../../../../test/repositories/In-memory-tasks-repository';
import { CreateTask } from './create-task';
import { FindTaskById } from './find-task';

describe('Create task', () => {
  it('should be able to find a task by given id', async () => {
    const repository = new InMemoryTasksRepository();
    const findTask = new FindTaskById(repository);
    const createTask = new CreateTask(repository);

    await createTask.execute({
      category: 'Business',
      label: 'study',
      ownerId: 'john-doe-id',
      expiration: new Date(),
      id: 'some-id',
    });

    const { data } = await findTask.execute('some-id');

    expect(data).toHaveProperty('id', 'some-id');
  });
});

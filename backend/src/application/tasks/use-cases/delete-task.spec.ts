import { InMemoryTasksRepository } from '../../../../test/repositories/In-memory-tasks-repository';
import { CreateTask } from './create-task';
import { DeleteTask } from './delete-task';
import { FindTaskById } from './find-task';

describe('Delete task', () => {
  it('should be able to delete task', async () => {
    const repository = new InMemoryTasksRepository();
    const findTask = new FindTaskById(repository);
    const createTask = new CreateTask(repository);
    const deleteTask = new DeleteTask(repository);

    await createTask.execute({
      category: 'Business',
      label: 'study',
      ownerId: 'john-doe-id',
      expiration: new Date(),
      id: 'some-id',
    });

    await deleteTask.execute('some-id');

    const { data } = await findTask.execute('some-id');

    expect(data).toBeFalsy();
  });
});

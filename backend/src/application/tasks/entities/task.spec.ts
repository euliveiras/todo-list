import { Category } from './category';
import { Task } from './task';

describe('Task', () => {
  it('should be able to create a task', () => {
    const task = new Task({
      category: new Category('Business'),
      expiration: new Date(),
      label: 'Study NestJS',
      ownerId: 'some-id',
    });

    expect(task).toBeTruthy();
  });
});

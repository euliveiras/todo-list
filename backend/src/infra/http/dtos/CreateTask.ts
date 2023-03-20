import { CategoryType } from 'src/application/tasks/entities/category';

export interface CreateTaskDTO {
  label: string;
  additionalInfo?: string;
  expiration: Date;
  categories: CategoryType[];
  ownerId: string;
}

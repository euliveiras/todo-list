export interface CreateTaskDTO {
  label: string;
  additionalInfo?: string;
  expiration: Date;
  categories: string;
  ownerId: string;
}

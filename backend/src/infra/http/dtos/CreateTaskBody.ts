import { CategoryType } from 'src/application/tasks/entities/category';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskBody {
  @IsNotEmpty()
  @IsString()
  label: string;

  additionalInfo?: string;

  @IsNotEmpty()
  expiration: Date;

  @IsNotEmpty()
  @IsString()
  category: CategoryType;

  @IsNotEmpty()
  @IsString()
  ownerId: string;
}

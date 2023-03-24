import { CategoryType } from 'src/application/tasks/entities/category';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskBody {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
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

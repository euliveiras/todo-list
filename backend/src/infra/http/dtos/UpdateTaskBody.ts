import { IsOptional, IsString, MinLength } from 'class-validator';
import { CategoryType } from 'src/application/tasks/entities/category';

export class UpdateTaskBody {
  @IsOptional()
  @IsString()
  @MinLength(2)
  label: string;

  @IsOptional()
  @IsString()
  additionalInfo?: string;

  @IsOptional()
  expiration?: Date;

  @IsOptional()
  @IsString()
  category?: CategoryType;
}

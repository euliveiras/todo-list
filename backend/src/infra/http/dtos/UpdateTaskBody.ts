import { IsOptional, IsString } from 'class-validator';
import { CategoryType } from 'src/application/tasks/entities/category';

export class UpdateTaskBody {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  additionalInfo?: string;

  @IsOptional()
  expiration?: Date;

  @IsOptional()
  @IsString()
  category?: CategoryType;
}

import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetCategoriesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}

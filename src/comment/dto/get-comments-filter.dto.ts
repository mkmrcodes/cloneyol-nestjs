import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetCommentsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}

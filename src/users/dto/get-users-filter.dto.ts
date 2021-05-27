import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}

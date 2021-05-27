import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetRatingsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}

import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetMerchantsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}

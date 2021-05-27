import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetPromotionsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}

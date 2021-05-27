import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetBrandsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
  @IsOptional()
  @IsNotEmpty()
  ids: string;
}

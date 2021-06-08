import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetItemsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: number;
  @IsOptional()
  @IsNotEmpty()
  wc: number;
  @IsOptional()
  @IsNotEmpty()
  wb: string;
  @IsOptional()
  @IsNotEmpty()
  fc: string;
  @IsOptional()
  @IsNotEmpty()
  prc: string;
  @IsOptional()
  @IsNotEmpty()
  pr: string;
  @IsOptional()
  @IsNotEmpty()
  sst: string;
  @IsOptional()
  @IsNotEmpty()
  q: string;
}

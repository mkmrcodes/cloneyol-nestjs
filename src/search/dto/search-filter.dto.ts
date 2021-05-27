import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class SearchFilterDto {
  @IsOptional()
  @IsNotEmpty()
  wb: string;
  @IsOptional()
  @IsNotEmpty()
  wc: string;
  @IsOptional()
  @IsNotEmpty()
  fc: string;
  @IsOptional()
  @IsNotEmpty()
  prc: string;
  @IsOptional()
  @IsNotEmpty()
  pr: string;
}

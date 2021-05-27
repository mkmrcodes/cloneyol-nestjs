import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetProfilesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}

import { IsNotEmpty, IsOptional } from 'class-validator';

export class JobsDto {
  @IsOptional()
  @IsNotEmpty()
  id: string;
  @IsOptional()
  @IsNotEmpty()
  item: string;
  @IsOptional()
  @IsNotEmpty()
  basket: string;
  @IsOptional()
  @IsNotEmpty()
  qty: number;
}

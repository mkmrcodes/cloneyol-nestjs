import { IsNotEmpty, IsOptional } from 'class-validator';

export class JobsDto {
  @IsOptional()
  @IsNotEmpty()
  id: string;
  @IsOptional()
  @IsNotEmpty()
  itemId: string;
  @IsOptional()
  @IsNotEmpty()
  tempBasketId: string;
  @IsOptional()
  @IsNotEmpty()
  userBasketId: string;
}
